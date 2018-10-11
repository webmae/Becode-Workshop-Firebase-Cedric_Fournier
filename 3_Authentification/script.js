// Initialize Firebase
// on met const parce qu'on va jamais changer la configuration
const config = {
  apiKey: "AIzaSyDDnPvI9hcuqlkjajsv7Hhqemmb0gH5zQg",
  authDomain: "mine-workshop-firebase.firebaseapp.com",
  databaseURL: "https://mine-workshop-firebase.firebaseio.com",
  projectId: "mine-workshop-firebase",
  storageBucket: "mine-workshop-firebase.appspot.com",
  messagingSenderId: "539434544291"
};
firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();
const auth = firebase.auth();

document.getElementById("btnSignUp").addEventListener('click', e=>{
  // code
  const email = document.getElementById('txtEmail').value;
  const password = document.getElementById("txtPassword").value;
  auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user){
          console.log("connecté");
          document.getElementById('btnSignUp').style.visibility = "hidden";
        }
      })
      .catch(function (error){
        console.log(error.message);
      });
})
document.getElementById("btnLogin").addEventListener('click', e=>{
  // code
  const email = document.getElementById('txtEmail').value;
  const password = document.getElementById("txtPassword").value;
  auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user){
          console.log("connecté");
          document.getElementById('btnLogin').style.visibility = "hidden";
        }
      })
      .catch(function (error){
        console.log(error.message);
      });
})


/*
// le code qui suit vient de la doc
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
*/
