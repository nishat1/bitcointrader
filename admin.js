// get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const login_inputs = document.getElementById('login_inputs');
const convRateForm = document.getElementById('convRateForm');
const btcConvRate = document.getElementById('btcConvRate');
const bchConvRate = document.getElementById('bchConvRate');
const ethConvRate = document.getElementById('ethConvRate');
const ltcConvRate = document.getElementById('ltcConvRate');
const buyMargin = document.getElementById('buyMargin');
const sellMargin = document.getElementById('sellMargin');

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
const dbConvRateObj = firebase.database().ref().child('conv_rates');
const dbMarginObj = firebase.database().ref().child('margins');

// // Sync object changes
dbConvRateObj.on('value', snap => {
  bchConvRate.value = snap.val().bch;
  btcConvRate.value = snap.val().btc;
  ltcConvRate.value = snap.val().ltc;
  ethConvRate.value = snap.val().eth;
});

dbMarginObj.on('value', snap => {
  buyMargin.value = snap.val().buy;
  sellMargin.value = snap.val().sell;
});

function exch_rate() {

  // const dbConvRateObj = firebase.database().ref().child('conv_rates');

  dbConvRateObj.child('bch').set(bchConvRate.value);
  dbConvRateObj.child('btc').set(btcConvRate.value);
  dbConvRateObj.child('ltc').set(ltcConvRate.value);
  dbConvRateObj.child('eth').set(ethConvRate.value);

  dbMarginObj.child('buy').set(buyMargin.value);
  dbMarginObj.child('sell').set(sellMargin.value);

  window.location.href = "index.html";

}
