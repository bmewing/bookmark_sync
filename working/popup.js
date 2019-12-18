// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Traverse the bookmark tree, and print the folder and nodes.
function dumpBookmarks(query) {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      // $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes));
        $('#bookmarks').append(JSON.stringify(bookmarkTreeNodes[0], null, 2))
    });
}
function dumpTreeNodes(bookmarkNodes) {
  var list = $('<ul>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(dumpNode(bookmarkNodes[i]));
  }
  return list;
}
function dumpNode(bookmarkNode) {
  if (bookmarkNode.title) {
    var anchor = $('<a>');
    anchor.attr('href', "#");
    anchor.text("");

    var title = $('<span>'+bookmarkNode.title+'</span>')

    var url = bookmarkNode.children ?
        $('<span></span>') :
        $('<span> ['+bookmarkNode.url+']</span>')
    /*
     * When clicking on a bookmark in the extension, a new tab is fired with
     * the bookmark url.
     */
    var span = $('<span>');
    // Show add and edit links when hover over.
    span.append(title).append(url);
  }
  var li = $(bookmarkNode.title ? '<li>' : '<div>').append(span);
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children));
  }
  return li;
}

document.addEventListener('DOMContentLoaded', function () {
  dumpBookmarks();
});
