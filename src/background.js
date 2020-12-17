  var contractMenu = {
    "id": "address",
    "title": "Check contract",
    "contexts": ["selection"]
  };
  chrome.contextMenus.create(contractMenu);

  chrome.contextMenus.onClicked.addListener(function(clickContract){

    var selection = clickContract.selectionText;

    if(clickContract.menuItemId == "address" && clickContract.selectionText && selection.length != 42){
      alert('Invalid address.\nAn address should be 42 characters long.');
    } else {
      chrome.storage.sync.set({'value':selection});
      chrome.tabs.create({url:'src/contract-details.html'});

    }
  });
