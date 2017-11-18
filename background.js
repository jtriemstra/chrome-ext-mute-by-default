chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.url && "" != changeInfo.url)
	{
		console.log("url change");
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