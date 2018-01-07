// get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');

const login_inputs = document.getElementById('login_inputs');
const convRateForm = document.getElementById('convRateForm');

const btcTXFee = document.getElementById('btcTXFee');
const bchTXFee = document.getElementById('bchTXFee');
const ethTXFee = document.getElementById('ethTXFee');
const ltcTXFee = document.getElementById('ltcTXFee');
const xrpTXFee = document.getElementById('xrpTXFee');
const btgTXFee = document.getElementById('btgTXFee');
const dogeTXFee = document.getElementById('dogeTXFee');
const kinTXFee = document.getElementById('kinTXFee');

const buyMargin = document.getElementById('buyMargin');
const sellMargin = document.getElementById('sellMargin');

const xrpRate = document.getElementById('xrpRate');
const btcRate = document.getElementById('btcRate');
const bchRate = document.getElementById('bchRate');
const btgRate = document.getElementById('btgRate');
const ethRate = document.getElementById('ethRate');
const ltcRate = document.getElementById('ltcRate');
const dogeRate = document.getElementById('dogeRate');
const kinRate = document.getElementById('kinRate');

// add login event
btnLogin.addEventListener('click', e => {
  // get email and Password
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email,password);
  promise.catch(e => console.log(e.message));
});

// listener for logout button
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

// real-time listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    btnLogout.classList.remove('hide');
    login_inputs.classList.add('hide');
    convRateForm.classList.remove('hide');
  } else {
    console.log('not logged in');
    btnLogout.classList.add('hide');
    login_inputs.classList.remove('hide');
    convRateForm.classList.add('hide');
  }
});

// Create references
const dbTXFee = firebase.database().ref().child('coin_data').child('txFee');
const dbMarginObj = firebase.database().ref().child('coin_data').child('margins');
const dbConvRateObj = firebase.database().ref().child('coin_data').child('conv_rates');

// Sync object changes
dbTXFee.on('value', snap => {
  bchTXFee.value = snap.val().bch;
  btcTXFee.value = snap.val().btc;
  ltcTXFee.value = snap.val().ltc;
  ethTXFee.value = snap.val().eth;
  xrpTXFee.value = snap.val().xrp;
  btgTXFee.value = snap.val().btg;
  dogeTXFee.value = snap.val().doge;
  kinTXFee.value = snap.val().kin;
});

dbMarginObj.on('value', snap => {
  buyMargin.value = snap.val().buy;
  sellMargin.value = snap.val().sell;
});

dbConvRateObj.on('value', snap => {
  xrpRate.value = snap.val().xrp;
  btcRate.value = snap.val().btc;
  bchRate.value = snap.val().bch;
  btgRate.value = snap.val().btg;
  ethRate.value = snap.val().eth;
  ltcRate.value = snap.val().ltc;
  dogeRate.value = snap.val().doge;
  kinRate.value = snap.val().kin;
})

function buysell_btn() {

  dbMarginObj.set({
    buy : buyMargin.value,
    sell : sellMargin.value
  });

  window.location.href = "index.html";

}

function convRate_btn() {

  dbConvRateObj.set({
    bch : bchRate.value,
    btc : btcRate.value,
    ltc : ltcRate.value,
    xrp : xrpRate.value,
    btg : btgRate.value,
    eth : ethRate.value,
    doge : dogeRate.value,
    kin : kinRate.value
  });

  window.location.href = "index.html";

}

function txFee_btn() {

  dbTXFee.set({
    bch : bchTXFee.value,
    btc : btcTXFee.value,
    ltc : ltcTXFee.value,
    eth : ethTXFee.value,
    xrp : xrpTXFee.value,
    btg : btgTXFee.value,
    doge : dogeTXFee.value,
    kin : kinTXFee.value
  });

  window.location.href = "index.html";

}
