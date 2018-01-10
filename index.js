const url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,BCH,ETH,LTC,XRP,BTG,DOGE,KIN&tsyms=CAD";

const currencyRadioBtn = document.getElementsByName('currency');
const buysellRadioBtn = document.getElementsByName('buysell');
const buySellAmount = document.getElementById('buySellAmount');
const bitcoinAmount = document.getElementById('bitcoinAmount');

const dollarInput = document.getElementById('dollarInput');
const cryptoInput = document.getElementById('cryptoInput');
const calculateBtn = document.getElementById('calculateBtn');
// const calculatedAmount = document.getElementById('calculatedAmount');
// const calculatedAmountBox2 = document.getElementById('calculatedAmountBox2');
const calculationType = document.getElementsByName('calculationType');

const tableDollarAmount = document.getElementById('tableDollarAmount');
const numberOfCoins = document.getElementById('numberOfCoins');
const box1Rate = document.getElementById('box1Rate');
const box1Rate2 = document.getElementById('box1Rate2');
const box1TXFee = document.getElementById('box1TXFee');
const totalCostBox1 = document.getElementById('totalCostBox1');

const tableCryptoAmount = document.getElementById('tableCryptoAmount');
const costOfCoins = document.getElementById('costOfCoins');
const box2Rate = document.getElementById('box2Rate');
const box2Rate2 = document.getElementById('box2Rate2');
const box2TXFee = document.getElementById('box2TXFee');
const totalCostBox2 = document.getElementById('totalCostBox2');


// Create references
const dbMarginObj = firebase.database().ref().child('coin_data').child('margins');
const dbTXFee = firebase.database().ref().child('coin_data').child('txFee');
const dbConvRateObj = firebase.database().ref().child('coin_data').child('conv_rates');

var buy_margin;
var sell_margin;

var txFeeBTC;
var txFeeBCH;
var txFeeETH;
var txFeeLTC;
var txFeeXRP;
var txFeeBTG;
// var txFeeDOGE;
// var txFeeKIN;

var xrpRate;
var btcRate;
var bchRate;
var ltcRate;
var ethRate;
// var dogeRate;
var btgRate;
// var kinRate;

// get buy and sell margin from firebase database
dbMarginObj.on('value', snap => {
  buy_margin = snap.val().buy;
  sell_margin = snap.val().sell;
});

dbTXFee.on('value', snap => {
  txFeeBTC = snap.val().btc;
  txFeeBCH = snap.val().bch;
  txFeeETH = snap.val().eth;
  txFeeLTC = snap.val().ltc;
  txFeeXRP = snap.val().xrp;
  txFeeBTG = snap.val().btg;
  // txFeeDOGE = snap.val().doge;
  // txFeeKIN = snap.val().kin;
});

dbConvRateObj.on('value', snap => {

  xrpRate = snap.val().xrp;
  btcRate = snap.val().btc;
  bchRate = snap.val().bch;
  ethRate = snap.val().eth;
  ltcRate = snap.val().ltc;
  btgRate = snap.val().btg;
  // dogeRate = snap.val().doge;
  // kinRate = snap.val().kin;

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
var btg_price;
// var doge_price;
// var kin_price;

// prices with buy margin
var btcValBuy;
var bchValBuy;
var ethValBuy;
var ltcValBuy;
var xrpValBuy;
var btgValBuy;
// var dogeValBuy;
// var kinValVuy;

// prices with sell margin
var btcValSell;
var bchValSell;
var ethValSell;
var ltcValSell;
var xrpValSell;
var btgValSell;
// var dogeValSell;
// var kinValSell;

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
      btg_price = JSON.parse(this.responseText).BTG.CAD; // bitcoin gold
      // doge_price = JSON.parse(this.responseText).DOGE.CAD; // dogecoin
      // kin_price = JSON.parse(this.responseText).KIN.CAD; // kin

      // add margin rates
      // bitcoin
      btcValBuy = parseFloat(Math.round(btc_price*buy_margin*btcRate*100)/100).toFixed(2);
      btcValSell = parseFloat(Math.round(btc_price*sell_margin*100)/100).toFixed(2);

      // bitcoin cash
      bchValBuy = parseFloat(Math.round(bch_price*buy_margin*bchRate*100)/100).toFixed(2);
      bchValSell = parseFloat(Math.round(bch_price*sell_margin*100)/100).toFixed(2);

      // ethereum
      ethValBuy = parseFloat(Math.round(eth_price*buy_margin*ethRate*100)/100).toFixed(2);
      ethValSell = parseFloat(Math.round(eth_price*sell_margin*100)/100).toFixed(2);

      // litecoin
      ltcValBuy = parseFloat(Math.round(ltc_price*buy_margin*ltcRate*100)/100).toFixed(2);
      ltcValSell = parseFloat(Math.round(ltc_price*sell_margin*100)/100).toFixed(2);

      // ripple
      xrpValBuy = parseFloat(Math.round(xrp_price*buy_margin*xrpRate*100)/100).toFixed(2);
      xrpValSell = parseFloat(Math.round(xrp_price*sell_margin*100)/100).toFixed(2);

      // bitcoin gold
      btgValBuy = parseFloat(Math.round(btg_price*buy_margin*btgRate*100)/100).toFixed(2);
      btgValSell = parseFloat(Math.round(btg_price*sell_margin*100)/100).toFixed(2);

      // doge
      // dogeValBuy = parseFloat(Math.round(doge_price*buy_margin*dogeRate*10000)/10000).toFixed(4);
      // dogeValSell = parseFloat(Math.round(doge_price*sell_margin*10000)/10000).toFixed(4);

      // kin
      // kinValBuy = parseFloat(Math.round(kin_price*buy_margin*kinRate*10000)/10000).toFixed(4);
      // kinValSell = parseFloat(Math.round(kin_price*sell_margin*10000)/10000).toFixed(4);

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

      document.getElementById('BTGBUY').innerHTML = btgValBuy;
      document.getElementById('BTGSELL').innerHTML = btgValSell;

      // document.getElementById('DOGEBUY').innerHTML = dogeValBuy;
      // document.getElementById('DOGESELL').innerHTML = dogeValSell;

      // document.getElementById('KINBUY').innerHTML = kinValBuy;
      // document.getElementById('KINSELL').innerHTML = kinValSell;
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
      txFee = parseFloat(Math.round(txFeeBTC*1000000)/1000000).toFixed(6);
    } else if(currencyRadioBtn[1].checked) {
      coinVal = bchValBuy;
      coinType = " Bitcoin Cash";
      txFee = parseFloat(Math.round(txFeeBCH*1000000)/1000000).toFixed(6);
    } else if(currencyRadioBtn[2].checked) {
      coinVal = btgValBuy;
      coinType = " Bitcoin Gold";
      txFee = parseFloat(Math.round(txFeeBTG*1000000)/1000000).toFixed(6);
    } else if(currencyRadioBtn[3].checked) {
      coinVal = ethValBuy;
      coinType = " Ethereum";
      txFee = parseFloat(Math.round(txFeeETH*1000000)/1000000).toFixed(6);
    } else if(currencyRadioBtn[4].checked) {
      coinVal = ltcValBuy;
      coinType = " Litecoin";
      txFee = parseFloat(Math.round(txFeeLTC*1000000)/1000000).toFixed(6);
    } else if(currencyRadioBtn[5].checked) {
      coinVal = xrpValBuy;
      coinType = " Ripple";
      txFee = parseFloat(Math.round(txFeeXRP*1000000)/1000000).toFixed(6);
    }
  } else if(buysellRadioBtn[1].checked) {
    if(currencyRadioBtn[0].checked) {
      coinVal = btcValSell;
      coinType = " Bitcoin";
      txFee = "N/A";
    } else if(currencyRadioBtn[1].checked) {
      coinVal = bchValSell;
      coinType = " Bitcoin Cash";
      txFee = "N/A";
    } else if(currencyRadioBtn[2].checked) {
      coinVal = btgValSell;
      coinType = " Bitcoin Gold";
      txFee = "N/A";
    } else if(currencyRadioBtn[3].checked) {
      coinVal = ethValSell;
      coinType = " Ethereum";
      txFee = "N/A";
    } else if(currencyRadioBtn[4].checked) {
      coinVal = ltcValSell;
      coinType = " Litecoin";
      txFee = "N/A";
    } else if(currencyRadioBtn[5].checked) {
      coinVal = xrpValSell;
      coinType = " Ripple";
      txFee = "N/A";
    }
  }

  // display calculated amount for dollar amount
  // calculatedAmount.innerHTML = "<b>Number of coins:</b> " + parseFloat(Math.round(amountVal/coinVal*1000000)/1000000).toFixed(6)
  //   + coinType + " @ $" + coinVal + "/" + coinType
  //   + "<br><b>TX Fee:</b> " + txFee;

  numberOfCoins.innerHTML = parseFloat(Math.round(amountVal/coinVal*1000000)/1000000).toFixed(6) + coinType;
  box1Rate.innerHTML = "<b>@</b> &emsp; $" + coinVal + " /" + coinType;
  box1Rate2.innerHTML = "<b>@</b> &emsp; $" + coinVal + " /" + coinType;
  if(buysellRadioBtn[0].checked) {
    box1TXFee.innerHTML = txFee + coinType;
    totalCostBox1.innerHTML = parseFloat(Math.round((parseFloat(Math.round(amountVal/coinVal*1000000)/1000000).toFixed(6) - txFee)*1000000)/1000000).toFixed(6) + coinType;
  } else if(buysellRadioBtn[1].checked) {
    box1TXFee.innerHTML = txFee;
    totalCostBox1.innerHTML = parseFloat(Math.round(amountVal/coinVal*1000000)/1000000).toFixed(6) + coinType;
  }

  // display calculated amount for bitcoin amount
  // calculatedAmountBox2.innerHTML = "<b>Cost of coins:</b> " + "$" + parseFloat(Math.round(bitcoinAmountVal*coinVal*100)/100).toFixed(2)
  //   + " for " + bitcoinAmountVal + " " + coinType
  //   + "<br><b>TX Fee:</b> " + txFee;

  costOfCoins.innerHTML = "$" + parseFloat(Math.round(bitcoinAmountVal*coinVal*100)/100).toFixed(2);
  box2Rate.innerHTML = "<b>for</b> &emsp; " + bitcoinAmountVal + " " + coinType;
  box2Rate2.innerHTML = "<b>for</b> &emsp; " + bitcoinAmountVal + " " + coinType;
  if(buysellRadioBtn[0].checked) {
    box2TXFee.innerHTML = "$" + parseFloat(Math.round(txFee*coinVal*100)/100).toFixed(2);
    totalCostBox2.innerHTML = "$" + parseFloat(Math.round((parseFloat(Math.round(bitcoinAmountVal*coinVal*100)/100).toFixed(2) -
                                    parseFloat(Math.round(txFee*coinVal*100)/100).toFixed(2)*-1)*100)/100).toFixed(2);
  } else if(buysellRadioBtn[1].checked) {
    box2TXFee.innerHTML = txFee;
    totalCostBox2.innerHTML = "$" + parseFloat(Math.round(bitcoinAmountVal*coinVal*100)/100).toFixed(2);
  }
}

// modify html display based on radio button clicks
function calculationDollarType() {
  dollarInput.classList.remove('hide');
  cryptoInput.classList.add('hide');
  calculateBtn.classList.remove('hide');
  // calculatedAmount.classList.remove('hide');
  // calculatedAmountBox2.classList.add('hide');
  tableDollarAmount.classList.remove('hide');
  tableCryptoAmount.classList.add('hide');
}

// modify html display based on radio button clicks
function calculationCryptoType() {
  dollarInput.classList.add('hide');
  cryptoInput.classList.remove('hide');
  calculateBtn.classList.remove('hide');
  // calculatedAmount.classList.add('hide');
  // calculatedAmountBox2.classList.remove('hide');
  tableDollarAmount.classList.add('hide');
  tableCryptoAmount.classList.remove('hide');
}
