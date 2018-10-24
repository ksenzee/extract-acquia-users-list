function createJson() {
  browser.tabs.executeScript({
    file: "extract.js"
  });
}

function downloadJson(message) {
  var str = JSON.stringify(message);
  var now = new Date();
  var data = new Blob([str], {type: 'application/json'});
  var url = URL.createObjectURL(data);
  var downloading = browser.downloads.download({
    url: url,
    saveAs: true,
    filename: 'acquia-users-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate()) + '.json'
  }).then(function (id) {
    browser.downloads.onChanged.addListener(function (downloadDelta) {
      if (id === downloadDelta) {
        URL.revokeObjectURL(url);
      }
      else {
        console.log(downloadDelta);
      }
    });
  });
}

browser.pageAction.onClicked.addListener(createJson);

browser.runtime.onMessage.addListener(downloadJson);

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(tab.url);
  if (tab.url.match(/^https:\/\/cloud.acquia.com\/app\/manage\/organizations\//)) {
    browser.pageAction.show(tab.id);
  }
});
