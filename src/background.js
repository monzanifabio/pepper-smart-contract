  var contractMenu = {
    "id": "address",
    "title": "Check contract",
    "contexts": ["selection"]
  };
  chrome.contextMenus.create(contractMenu);

  chrome.contextMenus.onClicked.addListener(function(clickContract){

    var selection = clickContract.selectionText;
    var endpoint = 'https://api.coingecko.com/api/v3/coins/ethereum/contract/';

    if(clickContract.menuItemId == "address" && clickContract.selectionText && selection.length != 42){
      alert('Invalid address.\nAn address should be 42 characters long.');
    } else {
      $.ajax({
          url: endpoint + selection,
          contentType: "application/json",
          dataType: 'json',
          success: function(result){
            console.log(result);
            alert(result.name + " (" + result.symbol + ")");
          },
          error: function(errorMessage){
            alert("We could not find a smart contract with that address in our database. The smart contract although, might exist.");
          }
      })
    }
  });
