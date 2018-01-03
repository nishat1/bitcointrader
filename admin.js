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
const buyMargin = document.getElementById('buyMargin');
const sellMargin = document.getElementById('sellMargin');
const xrpRate = document.getElementById('xrpRate');

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
});

dbMarginObj.on('value', snap => {
  buyMargin.value = snap.val().buy;
  sellMargin.value = snap.val().sell;
});

dbConvRateObj.on('value', snap => {
  xrpRate.value = snap.val().xrp;
})

function exch_rate() {

  dbTXFee.child('bch').set(bchTXFee.value);
  dbTXFee.child('btc').set(btcTXFee.value);
  dbTXFee.child('ltc').set(ltcTXFee.value);
  dbTXFee.child('eth').set(ethTXFee.value);
  dbTXFee.child('xrp').set(xrpTXFee.value);
  dbTXFee.child('btg').set(btgTXFee.value);

  dbMarginObj.child('buy').set(buyMargin.value);
  dbMarginObj.child('sell').set(sellMargin.value);

  dbConvRateObj.child('xrp').set(xrpRate.value);

  window.location.href = "index.html";

}

// Sync object changes again
dbTXFee.on('value', snap => {
  bchTXFee.value = snap.val().bch;
  btcTXFee.value = snap.val().btc;
  ltcTXFee.value = snap.val().ltc;
  ethTXFee.value = snap.val().eth;
  xrpTXFee.value = snap.val().xrp;
  btgTXFee.value = snap.val().btg;
});

dbMarginObj.on('value', snap => {
  buyMargin.value = snap.val().buy;
  sellMargin.value = snap.val().sell;
});

dbConvRateObj.on('value', snap => {
  xrpRate.value = snap.val().xrp;
})
