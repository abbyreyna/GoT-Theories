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

// //ReAuthenticate User && Email/PW update
// const opw = oldpw.val().trim();
// if (opw !== "") {
//   firebase.auth().onAuthStateChanged(function(cuser) {
//     if (cuser) {
//       //ReAuth
//       let cred = firebase.auth.EmailAuthProvider.credential(
//         cuser.email,
//         opw
//       );
//       cuser
//         .reauthenticateAndRetrieveDataWithCredential(cred)
//         .then(function() {
//           console.log("USER REAUTHENTICATED!!!!!");
//           //change email
//           let einput = email.val().trim();
//           if (einput.length > 0) {
//             cuser
//               .updateEmail(einput)
//               .then(function() {
//                 //console.log("USER EMAIL HAS BEEN CHANGED TO: " + einput);
//               })
//               .catch(function(e) {
//                 console.log(e);
//               });
//           }
//         })
//         .catch(function(e) {
//           error(e.message);
//         })
//         .then(function() {
//           //reAuth in case of new email
//           const credpw = firebase.auth.EmailAuthProvider.credential(
//             cuser.email,
//             opw
//           );
//           cuser
//             .reauthenticateAndRetrieveDataWithCredential(credpw)
//             .then(function() {
//               console.log("USER REAUTHENTICATED!!!!!");
//               //change password
//               let pinput = newpw.val().trim();
//               if (pinput.length > 0) {
//                 cuser.updatePassword(pinput);
//                 //console.log("USER PASSWORD HAS BEEN CHANGED TO: " + pinput);
//               }
//             });
//         });
//     } else {
//       console.log("SOMETHING WENT WRONG");
//     }
