var storyContainerSelector = "._5jmm";
var checked = {};
var matches = ['elitedaily.com', 'elitedai.ly', 'youtube.com', 'youtu.be', 'ghostbed.com', 'huff.to'];

function isMatch(href) {
    for (var i = 0; i < matches.length; i++) {
        if (href.match(matches[i])) {
            return true;
        }
    }
}

function hasMatchedLink (nodeList) {
    for (var i = 0; i < nodeList.length; i++) {
        var href = nodeList[i].href;
        if (isMatch(href)) {
            return true;
        }
    }
}

function parseFeed(){
    var nodes = getNodes();
    
    for (var idx = 0; idx < nodes.length; idx++) {
        var node = nodes[idx];
        if (checked[node.id]) {
            continue;
        }
        checked[node.id] = true;
        
        var anchors = node.querySelectorAll('a');
        if (hasMatchedLink(anchors)) {
            addToBlackList(node)
        } 
    }
}

function getNodes(){
    return document.querySelectorAll(storyContainerSelector);
}

function togglePageAction(val) {
    chrome.runtime.sendMessage({
        method: 'togglePageAction',
        data: {
            toggle: val
        }
    });
}

function addToBlackList(node) {
    var profileLink = node.querySelector('.fwb a');
    chrome.runtime.sendMessage({
        method: 'addToBlackList',
        data: {
            href: profileLink.href,
            name: profileLink.textContent
        }
    });
    togglePageAction(true);
    node.style.opacity = .5;
}

togglePageAction(false);
parseFeed();
var debounced = _.debounce(parseFeed, 100);
document.addEventListener('scroll', debounced);
