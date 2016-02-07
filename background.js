chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "togglePageAction") {
        togglePageAction(sender.tab.id, request.data.toggle);
    }
 });

function togglePageAction(id, val){
    if (val) {
        chrome.pageAction.show(id);
    } else {
        chrome.pageAction.hide(id);
    }
}
