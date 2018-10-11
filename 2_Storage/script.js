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

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Add Image
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('change', (e) => {
  let file = e.target.files[0];
  let locationRef = storage.ref('users/' + file.name);
  let task = locationRef.put(file);
  let uploader = document.getElementById('progressBar');

  task.on('state_changed',
    function progress(snapshot) { //progress
    let per = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploader.value = per;
  },
  function error(error) { },
  function complete() {
    console.log('Done');
  }
)
});
