chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	const MUTE_KEY = "manualMutes";
	
	if (changeInfo.url && "" != changeInfo.url)
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
	
	if (changeInfo.mutedInfo)
	{
		chrome.storage.local.get(MUTE_KEY, function(data){
			var manualMutes = data.manualMutes || [];
			manualMutes["'" + tabId + "'"] = changeInfo.mutedInfo.muted;
			chrome.storage.local.set({MUTE_KEY:manualMutes});
		});
		
	}
});