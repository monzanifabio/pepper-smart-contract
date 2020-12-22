chrome.storage.sync.get(['value'], function(result) {
  var selection = result.value;
  console.log(result.value);

  var endpoint = 'https://api.coingecko.com/api/v3/coins/ethereum/contract/';

  var contractLogo = $('#contractLogo');
  var contractName = $('#contractName');
  var contractTicker = $('#contractTicker');
  var tokenPrice = $('#tokenPrice');
  var contractAddress = $('#contractAddress');
  var website = $('#website');
  var github = $('#github');
  var etherscan = $('#etherscan');
  var uniswap = $('#uniswap');
  var twitter = $('#twitter');
  var telegram = $('#telegram');

  $.ajax({
      url: endpoint + selection,
      contentType: "application/json",
      dataType: 'json',
      success: function(result){
        console.log(result);
        $('#loadingSpinner').hide();
        contractLogo.attr('src', result.image.large).show();
        contractName.text(result.name);
        contractTicker.text(" (" + result.symbol + ")");
        contractAddress.text(selection);
        tokenPrice.text('$ ' + result.market_data.current_price.usd);
        $('#priceElement').show();
        //Website
        if (result.links.homepage.length === 0) {
          $('#websiteElement').css({"display":"none"});
          website.css({"display":"none"});
        } else {
          website.attr('href', result.links.homepage[0]);
          $('#websiteElement').show();
        }
        //Github
        if (result.links.repos_url.github.length === 0) {
          $('#githubElement').css({"display":"none"});
          github.css({"display":"none"});
        } else {
          github.attr('href', result.links.repos_url.github[0]);
          $('#githubElement').show();
        }
        //Etherscan
        etherscan.attr('href', result.links.blockchain_site[0]);
        $('#etherscanElement').show();
        //Uniswap
        uniswap.attr('href', 'https://info.uniswap.org/token/' + selection);
        $('#uniswapElement').show();
        //Twitter
        if (result.links.twitter_screen_name.length === 0) {
          $('#twitterElement').css({"display":"none"});
          twitter.css({"display":"none"});
        } else {
          twitter.attr('href', 'https://www.twitter.com/' + result.links.twitter_screen_name);
          $('#twitterElement').show();
        }
        //Telegram
        if (result.links.telegram_channel_identifier.length === 0) {
          $('#telegramElement').css({"display":"none"});
          telegram.css({"display":"none"});
        } else {
          telegram.attr('href', 'https://www.t.me/' + result.links.telegram_channel_identifier);
          $('#telegramElement').show();
        }
      },
      error: function(errorMessage){
        console.log(errorMessage);
        $('#loadingSpinner').hide();
        $('#contractLogo').css({"display":"none"});
        $('#websiteElement').css({"display":"none"});
        website.css({"display":"none"});
        $('#etherscanElement').css({"display":"none"});
        etherscan.css({"display":"none"});
        $('#githubElement').css({"display":"none"});
        github.css({"display":"none"});
        $('#twitterElement').css({"display":"none"});
        twitter.css({"display":"none"});
        $('#telegramElement').css({"display":"none"});
        telegram.css({"display":"none"});
        $('#contractError').css({"display":"block"});
        $('#etherscanHelper').attr('href', 'https://etherscan.io/token/' + selection);
        $('#uniswapHelper').attr('href', 'https://info.uniswap.org/token/' + selection);

      }
  })

});
