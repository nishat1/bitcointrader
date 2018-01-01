const url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,BCH,ETH,LTC,XRP&tsyms=CAD";

const currencyRadioBtn = document.getElementsByName('currency');
const buysellRadioBtn = document.getElementsByName('buysell');
const buySellAmount = document.getElementById('buySellAmount');
const bitcoinAmount = document.getElementById('bitcoinAmount');

const dollarInput = document.getElementById('dollarInput');
const cryptoInput = document.getElementById('cryptoInput');
const calculateBtn = document.getElementById('calculateBtn');
const calculatedAmount = document.getElementById('calculatedAmount');
const calculatedAmountBox2 = document.getElementById('calculatedAmountBox2');
const calculationType = document.getElementsByName('calculationType');

// Create references
const dbMarginObj = firebase.database().ref().child('margins');
const dbTXFee = firebase.database().ref().child('txFee');
const dbConvRateObj = firebase.database().ref().child('conv_rates');

var buy_margin;
var sell_margin;
var txFeeBTC;
var txFeeBCH;
var txFeeETH;
var txFeeLTC;
var txFeeXRP;
var xrpRate;

// get buy and sell margin from firebase database
dbMarginObj.on('value', snap => {
  console.log(snap.val());
  buy_margin = snap.val().buy;
  sell_margin = snap.val().sell;
});

dbTXFee.on('value', snap => {
  console.log(snap.val());
  txFeeBTC = snap.val().btc;
  txFeeBCH = snap.val().bch;
  txFeeETH = snap.val().eth;
  txFeeLTC = snap.val().ltc;
  txFeeXRP = snap.val().xrp;
});

dbConvRateObj.on('value', snap => {
  console.log(snap.val());
  xrpRate = snap.val().xrp;
})

// create a new XMLHttpRequest object based on browser
var xhttp;
if (window.XMLHttpRequest) {
  // code for modern browsers
  xhttp = new XMLHttpRequest();
} else {
  // code for old IE browsers
  xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// prices requested from cryptocompare server
var btc_price;
var bch_price;
var eth_price;
var ltc_price;
var xrp_price;

// prices with buy margin
var btcValBuy;
var bchValBuy;
var ethValBuy;
var ltcValBuy;
var xrpValBUy;

// prices with sell margin
var btcValSell;
var bchValSell;
var ethValSell;
var ltcValSell;
var xrpValSell;

// run intially
setTimeout(requestHttp,1000);

// request again every 10 seconds
setInterval(requestHttp,10000);
function requestHttp() {

  // open url with get request
  xhttp.open("GET", url, true);

  // wait for success response
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {

      // get price for each coin
      btc_price = JSON.parse(this.responseText).BTC.CAD; // bitcoin
      bch_price = JSON.parse(this.responseText).BCH.CAD; // bitcoin cash
      eth_price = JSON.parse(this.responseText).ETH.CAD; // ethereum
      ltc_price = JSON.parse(this.responseText).LTC.CAD; // litecoin
      xrp_price = JSON.parse(this.responseText).XRP.CAD; // Ripple

      // add margin rates
      // bitcoin
      btcValBuy = parseFloat(Math.round(btc_price*buy_margin*100)/100).toFixed(2);
      btcValSell = parseFloat(Math.round(btc_price*sell_margin*100)/100).toFixed(2);

      // bitcoin cash
      bchValBuy = parseFloat(Math.round(bch_price*buy_margin*100)/100).toFixed(2);
      bchValSell = parseFloat(Math.round(bch_price*sell_margin*100)/100).toFixed(2);

      // ethereum
      ethValBuy = parseFloat(Math.round(eth_price*buy_margin*100)/100).toFixed(2);
      ethValSell = parseFloat(Math.round(eth_price*sell_margin*100)/100).toFixed(2);

      // litecoin
      ltcValBuy = parseFloat(Math.round(ltc_price*buy_margin*100)/100).toFixed(2);
      ltcValSell = parseFloat(Math.round(ltc_price*sell_margin*100)/100).toFixed(2);

      // ripple
      xrpValBuy = parseFloat(Math.round(xrp_price*buy_margin*xrpRate*100)/100).toFixed(2);
      xrpValSell = parseFloat(Math.round(xrp_price*sell_margin*100)/100).toFixed(2);

      // update html table
      document.getElementById('BTCBUY').innerHTML = btcValBuy;
      document.getElementById('BTCSELL').innerHTML = btcValSell;

      document.getElementById('BCHBUY').innerHTML = bchValBuy;
      document.getElementById('BCHSELL').innerHTML = bchValSell;

      document.getElementById('ETHBUY').innerHTML = ethValBuy;
      document.getElementById('ETHSELL').innerHTML = ethValSell;

      document.getElementById('LTCBUY').innerHTML = ltcValBuy;
      document.getElementById('LTCSELL').innerHTML = ltcValSell;

      document.getElementById('XRPBUY').innerHTML = xrpValBuy;
      document.getElementById('XRPSELL').innerHTML = xrpValSell;
    }
  }

  // send request
  xhttp.send();
}

// called after calculate button is clicked
function calculateCoins() {

  // get values from form
  var amountVal = buySellAmount.value;
  var bitcoinAmountVal = bitcoinAmount.value;

  // output variables
  var coinVal;
  var coinType;
  var txFee;

  // check which radio buttons are checked
  if(buysellRadioBtn[0].checked) {
    if(currencyRadioBtn[0].checked) {
      coinVal = btcValBuy;
      coinType = " Bitcoin";
      txFee = txFeeBTC + " BTC";
    } else if(currencyRadioBtn[1].checked) {
      coinVal = bchValBuy;
      coinType = " Bitcoin Cash";
      txFee = txFeeBCH + " BCH";
    } else if(currencyRadioBtn[2].checked) {
      coinVal = ethValBuy;
      coinType = " Ethereum";
      txFee = txFeeETH + " ETH";
    } else if(currencyRadioBtn[3].checked) {
      coinVal = ltcValBuy;
      coinType = " Litecoin";
      txFee = txFeeLTC + " LTC";
    } else if(currencyRadioBtn[4].checked) {
      coinVal = xrpValBuy;
      coinType = " Ripple";
      txFee = txFeeXRP + " XRP";
    }
  } else if(buysellRadioBtn[1].checked) {
    if(currencyRadioBtn[0].checked) {
      coinVal = btcValSell;
      coinType = " Bitcoin";
    } else if(currencyRadioBtn[1].checked) {
      coinVal = bchValSell;
      coinType = " Bitcoin Cash";
    } else if(currencyRadioBtn[2].checked) {
      coinVal = ethValSell;
      coinType = " Ethereum";
    } else if(currencyRadioBtn[3].checked) {
      coinVal = ltcValSell;
      coinType = " Litecoin";
    }
  }

  // display calculated amount for dollar amount
  calculatedAmount.innerHTML = "<b>Number of coins:</b> " + amountVal/coinVal
    + coinType + " @ $" + coinVal + "/" + coinType
    + "<br><b>TX Fee:</b> " + txFee;

  // display calculated amount for bitcoin amount
  calculatedAmountBox2.innerHTML = "<b>Cost of coins:</b> " + "$" + parseFloat(Math.round(bitcoinAmountVal*coinVal*100)/100).toFixed(2)
    + " for " + bitcoinAmountVal + " " + coinType
    + "<br><b>TX Fee:</b> " + txFee;
}

// modify html display based on radio button clicks
function calculationDollarType() {
  dollarInput.classList.remove('hide');
  cryptoInput.classList.add('hide');
  calculateBtn.classList.remove('hide');
  calculatedAmount.classList.remove('hide');
  calculatedAmountBox2.classList.add('hide');
}

// modify html display based on radio button clicks
function calculationCryptoType() {
  dollarInput.classList.add('hide');
  cryptoInput.classList.remove('hide');
  calculateBtn.classList.remove('hide');
  calculatedAmount.classList.add('hide');
  calculatedAmountBox2.classList.remove('hide');
}
