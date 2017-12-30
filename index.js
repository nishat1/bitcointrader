const wss = new WebSocket('wss://api.bitfinex.com/ws/');

var conv_btc;
var conv_bch;
var conv_eth;
var conv_ltc;

const buy_margin = 1.04;
const sell_margin = 0.94;

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
const dbConvRateObj = firebase.database().ref().child('conv_rates');

// Sync object changes
dbConvRateObj.on('value', snap => console.log(snap.val()));

dbConvRateObj.on('value', snap => {
  conv_bch = snap.val().bch;
  conv_btc = snap.val().btc;
  conv_ltc = snap.val().ltc;
  conv_eth = snap.val().eth;
});

// holds channel ids for each response
var btc;
var bch;
var eth;
var ltc;

wss.onopen = () => {
  // API keys setup here (See "Authenticated Channels")
  wss.send(JSON.stringify({"event":"subscribe","channel":"ticker","pair":"BTCUSD"}));
  wss.send(JSON.stringify({"event":"subscribe","channel":"ticker","pair":"BCHUSD"}));
  wss.send(JSON.stringify({"event":"subscribe","channel":"ticker","pair":"ETHUSD"}));
  wss.send(JSON.stringify({"event":"subscribe","channel":"ticker","pair":"LTCUSD"}));
}

var btcValBuy;
var bchValBuy;
var ethValBuy;
var ltcValBuy;

var btcValSell;
var bchValSell;
var ethValSell;
var ltcValSell;

wss.onmessage = (msg) => {
  // console.log(msg.data)

   var response = JSON.parse(msg.data);

   // get channel id for each response
   if(response.pair == "BTCUSD" ) {
     btc = response.chanId;
   }
   if(response.pair == "BCHUSD" ) {
     bch = response.chanId;
   }
   if(response.pair == "ETHUSD" ) {
     eth = response.chanId;
   }
   if(response.pair == "LTCUSD" ) {
     ltc = response.chanId;
   }

   var chanid = response[0];

   if(chanid == btc) {
     var hb = response[1];
     if(hb != "hb") {

       btcValBuy = parseFloat(Math.round(response[3]*conv_btc*buy_margin * 100) / 100).toFixed(2);
       btcValSell = parseFloat(Math.round(response[1]*conv_btc*sell_margin * 100) / 100).toFixed(2);

       document.getElementById('BTCBUY').innerHTML = btcValBuy;
       document.getElementById('BTCSELL').innerHTML = btcValSell;
     }
   }

   if(chanid == bch) {
     var hb = response[1];
     if(hb != "hb") {

       bchValBuy = parseFloat(Math.round(response[3]*conv_bch*buy_margin * 100) / 100).toFixed(2);
       bchValSell = parseFloat(Math.round(response[1]*conv_bch*sell_margin * 100) / 100).toFixed(2);

       document.getElementById('BCHBUY').innerHTML = bchValBuy;
       document.getElementById('BCHSELL').innerHTML = bchValSell;
     }
   }

   if(chanid == eth) {
     var hb = response[1];
     if(hb != "hb") {

       ethValBuy = parseFloat(Math.round(response[3]*conv_eth*buy_margin * 100) / 100).toFixed(2);
       ethValSell = parseFloat(Math.round(response[1]*conv_eth*sell_margin * 100) / 100).toFixed(2);

       document.getElementById('ETHBUY').innerHTML = ethValBuy;
       document.getElementById('ETHSELL').innerHTML = ethValSell;
     }
   }

   if(chanid == ltc) {
     var hb = response[1];
     if(hb != "hb") {

       ltcValBuy = parseFloat(Math.round(response[3]*conv_ltc*buy_margin * 100) / 100).toFixed(2);
       ltcValSell = parseFloat(Math.round(response[1]*conv_ltc*sell_margin * 100) / 100).toFixed(2);

       document.getElementById('LTCBUY').innerHTML = ltcValBuy;
       document.getElementById('LTCSELL').innerHTML = ltcValSell;
     }
   }


}

function calculateCoins() {
  var amountVal = buySellAmount.value;
  var bitcoinAmountVal = bitcoinAmount.value;
  var coinVal;
  var coinType;
  var txFee;

  if(buysellRadioBtn[0].checked) {
    if(currencyRadioBtn[0].checked) {
      coinVal = btcValBuy;
      coinType = " Bitcoin";
      txFee = "0.0025 BTC";
    } else if(currencyRadioBtn[1].checked) {
      coinVal = bchValBuy;
      coinType = " Bitcoin Cash";
      txFee = "0.001 BCH";
    } else if(currencyRadioBtn[2].checked) {
      coinVal = ethValBuy;
      coinType = " Ethereum";
      txFee = "0.01 ETH";
    } else if(currencyRadioBtn[3].checked) {
      coinVal = ltcValBuy;
      coinType = " Litecoin";
      txFee = "N/A";
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

  calculatedAmount.innerHTML = "<b>Number of coins:</b> " + amountVal/coinVal
    + coinType + " @ $" + coinVal + "/" + coinType
    + "<br><b>TX Fee:</b> " + txFee;

  calculatedAmountBox2.innerHTML = "<b>Cost of coins:</b> " + "$" + parseFloat(Math.round(bitcoinAmountVal*coinVal*100)/100).toFixed(2)
    + " for " + bitcoinAmountVal + " " + coinType
    + "<br><b>TX Fee:</b> " + txFee;
}

function calculationDollarType() {
  dollarInput.classList.remove('hide');
  cryptoInput.classList.add('hide');
  calculateBtn.classList.remove('hide');
  calculatedAmount.classList.remove('hide');
  calculatedAmountBox2.classList.add('hide');
}

function calculationCryptoType() {
  dollarInput.classList.add('hide');
  cryptoInput.classList.remove('hide');
  calculateBtn.classList.remove('hide');
  calculatedAmount.classList.add('hide');
  calculatedAmountBox2.classList.remove('hide');
}
