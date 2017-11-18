chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	const MUTE_KEY = 'manualMutes';
	
	if (changeInfo.url && "" != changeInfo.url)
	{
		chrome.storage.local.get(MUTE_KEY, function(muteData){
			var manualMutes = muteData.manualMutes || {};
			var manuallyMuted = manualMutes["t" + tabId];

			if (manuallyMuted == null)
			{
				if (/msn\.com/.test(changeInfo.url))
				{
					chrome.tabs.update(tabId, {"muted":true}, function(tab){})
				}
				else
				{			
					chrome.tabs.update(tabId, {"muted":false}, function(tab){})
				}
			}
		});		
	}
	
	if (changeInfo.mutedInfo && changeInfo.mutedInfo.reason === "user")
	{		
		chrome.storage.local.get(MUTE_KEY, function(muteData){
			var manualMutes = muteData.manualMutes || {};
			manualMutes["t" + tabId] = changeInfo.mutedInfo.muted;
			
			chrome.storage.local.set({[MUTE_KEY]:manualMutes}, function(){console.log(chrome.runtime.lastError);});
		});
		
	}
});
