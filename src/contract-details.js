chrome.storage.sync.get(['value'], function(result) {
  var selection = result.value;
  console.log(result.value);

  var endpoint = 'https://api.coingecko.com/api/v3/coins/ethereum/contract/';

  var contractLogo = $('#contractLogo');
  var contractName = $('#contractName');
  var contractTicker = $('#contractTicker');
  var contractAddress = $('#contractAddress');
  var website = $('#website');
  var github = $('#github');
  var etherscan = $('#etherscan');
  var twitter = $('#twitter');
  var telegram = $('#telegram');

  $.ajax({
      url: endpoint + selection,
      contentType: "application/json",
      dataType: 'json',
      success: function(result){
        console.log(result);
        // alert(result.name + " (" + result.symbol + ")");
        contractLogo.attr('src', 'https://cryptofonts.com/img/icons/' + result.symbol + '.svg')
        contractName.text(result.name);
        contractTicker.text(" (" + result.symbol + ")");
        contractAddress.text(selection);
        website.attr('href', result.links.homepage[0]);
        //Github
        if (result.links.repos_url.github.length === 0) {
          $('#githubElement').css({"display":"none"});
          github.css({"display":"none"});
        } else {
          github.attr('href', result.links.repos_url.github[0]);
        }
        //Etherscan
        etherscan.attr('href', result.links.blockchain_site[0]);
        //Twitter
        if (result.links.twitter_screen_name.length === 0) {
          $('#twitterElement').css({"display":"none"});
          twitter.css({"display":"none"});
        } else {
          twitter.attr('href', 'https://www.twitter.com/' + result.links.twitter_screen_name)
        }
        //Telegram
        if (result.links.telegram_channel_identifier.length === 0) {
          $('#telegramElement').css({"display":"none"});
          telegram.css({"display":"none"});
        } else {
          telegram.attr('href', 'https://www.t.me/' + result.links.telegram_channel_identifier)
        }
      },
      error: function(errorMessage){
        alert("We could not find a smart contract with that address in our database. The smart contract although, might exist.");
      }
  })

});