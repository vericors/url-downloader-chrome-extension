chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // Get the URL of the active tab
    var currentUrl = tabs[0].url;
    var pageTitle = (tabs[0].title).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.]/g, ''); // .replace(/[\W_]+/g, '_');

    // Create an XML string in the webloc format
    var xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlString += '<plist version="1.0">\n';
    xmlString += '<dict>\n';
    xmlString += '<key>URL</key>\n';
    xmlString += '<string>' + currentUrl + '</string>\n';
    xmlString += '<key>title</key>\n';
    xmlString += '<string>' + pageTitle + '</string>\n';
    xmlString += '</dict>\n';
    xmlString += '</plist>\n';

    // Use the Chrome API to download the file
    chrome.downloads.download({
      url: 'data:application/octet-stream;base64,' + btoa(xmlString),
      filename: pageTitle + '.webloc'
    });
  });
});