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

// Get a reference to the database service
let database = firebase.database();


/*
  Script pour afficher les données dans le HTML
*/
// Je crée les noms en français de mon objet
const keylang = {
  birthday: "Anniversaire",
  city: "Ville",
  firstname: "Prénom",
  lastname: "Nom",
  mail: "E-mail"
}

// création de reloadData
function reloadData(snapshot){
  document.getElementById("myList").innerHTML = "";
  snapshot.forEach((item) => {
    const data = item.val();

    // récupérer les datas
    let newData = {
      firstname: data.firstname,
      lastname: data.lastname,
      birthday: data.birthday,
      city: data.city,
      mail: data.mail
    }
    // on créé des li et des ul
    let nodeUser = document.createElement("li");
    let nodeUserUL = document.createElement("ul");

    // pour chaque user et donc on les place dans la boucle
    for (let i in newData){
      let propertyValue = document.createTextNode(keylang[i] + " : " + newData[i]);
      let nodeUserLI = document.createElement("li");
      nodeUserLI.appendChild(propertyValue);
      nodeUserUL.appendChild(nodeUserLI);
    }

    nodeUser.appendChild(nodeUserUL);
    document.getElementById("myList").appendChild(nodeUser);
  });
}
// on va dans la base de données et on choisit l'objet users
const rootRef = database.ref("users/");
// Le .on c'est comme snapshot, c'est propre à firebase.
rootRef.on("value", function (snapshot){
  reloadData(snapshot);
})

/*
  How to read the database with a simple console.log
*/

var query = firebase.database().ref("users").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
      //console.log(key);
      //console.log(childData);
  });
});

/*
  how to write some basic stuff
*/

function writeUserData() {
  var adduserId = document.getElementById('adduserId').value;
  firebase.database().ref('users/' + adduserId).set({
    lastname: document.getElementById('addlastname').value,
    firstname: document.getElementById('addfirstname').value,
    birthday: document.getElementById('addbirthday').value,
    mail: document.getElementById('addmail').value,
    city : document.getElementById('addcity').value
  });
}
/*
// Méthode de Cedric qu'après il met un onsubmit="writeUserData(this); sur le formulaire dans le HTML
function writeUserData(form) {
  firebase.database().ref('users/' + form.userId.value).set({
    lastname: form.lastname.value,
    firstname: form.firstname.value,
    birthday: form.birthday.value,
    mail: form.mail.value,
    city : form.city.value
  });
}
*/

/*
  how to modify some stuff
*/
function updateUserData(form) {
  firebase.database().ref('users/' + form.userId.value).set({
    lastname: form.lastname.value,
    firstname: form.firstname.value,
    birthday: form.birthday.value,
    mail: form.mail.value,
    city : form.city.value
  });
}
/*
  how to delete some stuff
*/
function deleteData(form){
  database.ref('users/' + form.userId.value).remove()
    .then(function(){
      console.log("Remove succeeded")
    })
    .catch(function(error){
      console.log("Remove failed: " + error.message)
    });
}
