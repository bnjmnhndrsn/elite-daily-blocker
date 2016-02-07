chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "togglePageAction") {
        togglePageAction(sender.tab.id, request.data.toggle);
    } else if (request.method == 'addToBlackList') {
        addToBlackList(request.data);
    }
 });

chrome.storage.sync.clear();

function togglePageAction(id, val){
    if (val) {
        chrome.pageAction.show(id);
    } else {
        chrome.pageAction.hide(id);
    }
}

var regex = /facebook.com\/([^?/]+)(?:\/?\??)/;

function addToBlackList(data){
    var id = data.href.match(regex)[1];
    chrome.storage.sync.get({blacklist: {}}, function(storage){  
        storage.blacklist[id] = {
            href: data.href,
            name: data.name
        };
        chrome.storage.sync.set(storage);
    });
}
