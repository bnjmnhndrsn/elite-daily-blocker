var matches = ['youtube.com', 'nestio.com'];
var idx;
var parentNode;

function isMatch(href) {
    for (var i = 0; i < matches.length; i++) {
        console.log(matches[i]);
        console.log(href);
        if (href.match(matches[i])) {
            console.log(href);
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
    if (!parentNode || !parentNode.parentElement) {
        idx = 1;
        parentNode = getParentNode();
    }
    
    if (!parentNode) {
        return;
    }
    
    for (; idx < parentNode.children.length; idx++) {
        var node = parentNode.children[idx];
        var anchors = node.querySelectorAll('a');
        if (hasMatchedLink(anchors)) {
            console.log('match found');
            node.style.display = 'none';
        } else {
            console.log('no match found');
        }
    }
}

function getParentNode(){
    var container = document.getElementById('newsFeedHeading');
    return container ? container.parentElement : null;
}

parseFeed();

setInterval(parseFeed, 3000);
