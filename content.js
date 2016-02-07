var storyContainerSelector = "._5jmm";
var matches = ['elitedaily.com', 'elitedai.ly', 'youtube.com', 'youtu.be', 'ghostbed.com', 'huff.to'];
var idx = 0;

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
    
    for (; idx < nodes.length; idx++) {
        var node = nodes[idx];
        var anchors = node.querySelectorAll('a');
        if (hasMatchedLink(anchors)) {
            console.log('match found');
            togglePageAction(true);
            node.style.display = 'none';
        } else {
            console.log('no match found');
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

togglePageAction(false);
parseFeed();
var debounced = _.debounce(parseFeed, 100);
document.addEventListener('scroll', debounced);
