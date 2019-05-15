var mainApp = {};

$(document).ready(function() {
  /* global moment */

  var firebase = app_firebase;
  var uid = null;
  var userName = "";

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;
      userName = user.displayName;
      checkUserExists(userName, uid);
    } else {
      //no user signed in
      uid = null;
      window.location.replace("index.html");
    }
  });

  function logOut() {
    firebase.auth().signOut();
  }
  mainApp.logOut = logOut;
  $("#signOut").on("click", mainApp.logOut);

  var checkUserExists = function(userName, uid) {
    $.get("/api/authors/" + uid, function(e) {
      console.log(e);
      if (e !== null) {
      } else {
        createAuthor(userName, uid);
      }
    });
  };

  var createAuthor = function(userName, uid) {
    var newAuthor = {
      author_name: userName,
      uid: uid
    };
    console.log(newAuthor);
    // console.log(newBurger);
    // Send the POST request.
    $.ajax("/api/authors", {
      method: "POST",
      data: newAuthor
    }).then(function() {
      console.log("Added new authors");
    });
  };
});
