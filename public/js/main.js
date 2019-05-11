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
      myAccount(userName);
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

  //open modal when clicking my account
  let myAccount = id => {
    $("#myAccount").on("click", function() {
      let body = $("nav, section, footer");
      body.css({
        opacity: ".5",
        "pointer-events": "none"
      });
      let tempW = $("<div/>");
      tempW.css({
        "pointer-events": "auto",
        position: "absolute",
        top: "calc(50% - 225px)",
        left: "calc(50% - 425px)",
        width: "850px",
        height: "450px",
        "box-shadow": "0 5px 40px 2px rgba(155,155,155,1)",
        "background-color": "rgba(102, 102, 102, .85)",
        "border-radius": "15px 50px 30px",
        opacity: "1"
      });

      tempW.addClass("account");
      let temp = $("<div/>");
      temp.css({
        top: "calc(50% - 200px)",
        left: "calc(50% - 400px)",
        position: "relative",
        display: "grid",
        "justify-items": "center",
        "align-items": "center",
        "z-index": "99",
        width: "800px",
        height: "400px",
        padding: "30px",
        "border-radius": "0",
        "box-shadow": "0 5px 40px 2px rgba(155,155,155,1)",
        "background-color": "rgba(255, 255, 255, .9)",
        color: "black",
        "font-family": "Arial, Helvetica, sans-serif;",
        "font-weight": "bolder",
        border: "3px rgba(74, 170, 165, .9) solid",
        "font-size": "30px",
        "text-align": "center"
      });
      let b = $("body");
      let tempH = $("<h2/>");
      let tempD = $("<div/>");
      let close = $("<div/>");
      let pdiv = $("<div/>");
      let idiv = $("<div/>");
      let img = $("<img/>");
      let email = $("<input/>");
      let zip = $("<input/>");
      let oldpw = $("<input/>");
      let newpw = $("<input/>");
      let sub = $("<button> Update </button>");
      tempH.text("My Accounts Settings for " + id);
      tempD.css({
        display: "grid",
        "grid-template-columns": "1fr 2fr",
        "grid-template-rows": "90%",
        "grid-gap": "10px",
        width: "100%",
        height: "100%"
      });
      img.attr("src", "assets/img/unknownProfile.jpg").css({
        width: "200px",
        height: "200px"
      });
      pdiv
        .css({
          "grid-row": "1/1",
          "grid-column": "1/1",
          "justify-self": "center",
          "align-self": "center"
        })
        .append(img);
      email
        .attr({
          type: "email",
          placeholder: "   example@email.com",
          id: "email-update"
        })
        .css({
          "font-size": "15px",
          color: "rgba(74, 170, 165, .9)",
          width: "400px",
          height: "30px",
          outline: "none"
        });
      oldpw
        .attr({
          type: "text",
          placeholder: "   Old Password",
          id: "old-pw"
        })
        .css({
          "font-size": "15px",
          color: "rgba(74, 170, 165, .9)",
          width: "400px",
          height: "30px",
          outline: "none"
        });
      newpw
        .attr({
          type: "text",
          placeholder: "   New Password",
          id: "pw-update"
        })
        .css({
          "font-size": "15px",
          color: "rgba(74, 170, 165, .9)",
          width: "400px",
          height: "30px",
          outline: "none"
        });
      zip
        .attr({
          type: "text",
          maxlength: "5",
          id: "zip-update",
          placeholder: "   " + postal
        })
        .css({
          "font-size": "15px",
          color: "rgba(74, 170, 165, .9)",
          width: "400px",
          height: "30px",
          outline: "none"
        });
      sub
        .attr({
          type: "submit",
          id: "account-update"
        })
        .css({
          "box-shadow": "0 5px 10px 2px rgba(155,155,155,1)",
          "background-color": "rgba(255, 255, 255, .9)",
          color: "black",
          "font-family": "Arial, Helvetica, sans-serif;",
          "font-weight": "bolder",
          border: "3px rgba(74, 170, 165, .9) solid",
          "border-radius": "15px 50px 30px",
          "font-size": "15px",
          margin: "10px 0 10px auto",
          width: "100px",
          height: "35px",
          display: "block",
          "text-align": "center",
          outline: "none"
        });
      idiv.css({
        "grid-row": "1/1",
        "grid-column": "2/2",
        "justify-self": "left",
        "align-self": "center",
        "text-align": "left",
        "font-family": "Arial, Helvetica, sans-serif;",
        "font-weight": "bold",
        "font-size": "15px",
        margin: "20px auto"
      });
      pdiv.append(img);
      idiv
        .append("<p style = 'margin: 5px auto;'>Change Email</p>")
        .append(email);
      idiv
        .append("<p style = 'margin: 5px auto;'>Old Password</p>")
        .append(oldpw);
      idiv
        .append("<p style = 'margin: 5px auto;'>New Password</p>")
        .append(newpw);
      idiv
        .append("<p style = 'margin: 5px auto;'>Change Zip Code</p>")
        .append(zip);
      idiv.append(sub);
      tempD.append(pdiv);
      tempD.append(idiv);
      close.text("x");
      close.css({
        position: "absolute",
        top: "30px",
        right: "30px",
        "font-family": "Arial, Helvetica, sans-serif;",
        "font-weight": "bold",
        "font-size": "50px",
        color: "grey",
        width: "50px",
        height: "50px",
        cursor: "crosshair"
      });
      close.attr("id", "close");
      temp
        .append(tempH)
        .append(tempD)
        .append(close);
      tempW.append(temp);

      b.append(tempW);

      b.on("click", "#close", function() {
        $(this)
          .parent()
          .parent()
          .remove();
        body.css({
          opacity: "1",
          "pointer-events": "auto"
        });
      });

      b.on("click", "#account-update", function() {
        //zipcode Update
        if (zip.val().length === 5) {
          postal = zip.val();
          db.ref(uid).update({
            postal: zip.val()
          });
        } else {
          console.log("NO ZIP INPUT");
        }

        //ReAuthenticate User && Email/PW update
        const opw = oldpw.val().trim();
        if (opw !== "") {
          firebase.auth().onAuthStateChanged(function(cuser) {
            if (cuser) {
              //ReAuth
              let cred = firebase.auth.EmailAuthProvider.credential(
                cuser.email,
                opw
              );
              cuser
                .reauthenticateAndRetrieveDataWithCredential(cred)
                .then(function() {
                  console.log("USER REAUTHENTICATED!!!!!");
                  //change email
                  let einput = email.val().trim();
                  if (einput.length > 0) {
                    cuser
                      .updateEmail(einput)
                      .then(function() {
                        //console.log("USER EMAIL HAS BEEN CHANGED TO: " + einput);
                      })
                      .catch(function(e) {
                        console.log(e);
                      });
                  }
                })
                .catch(function(e) {
                  error(e.message);
                })
                .then(function() {
                  //reAuth in case of new email
                  const credpw = firebase.auth.EmailAuthProvider.credential(
                    cuser.email,
                    opw
                  );
                  cuser
                    .reauthenticateAndRetrieveDataWithCredential(credpw)
                    .then(function() {
                      console.log("USER REAUTHENTICATED!!!!!");
                      //change password
                      let pinput = newpw.val().trim();
                      if (pinput.length > 0) {
                        cuser.updatePassword(pinput);
                        //console.log("USER PASSWORD HAS BEEN CHANGED TO: " + pinput);
                      }
                    });
                });
            } else {
              console.log("SOMETHING WENT WRONG");
            }
          });
        }

        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .remove();
        body.css({
          opacity: "1",
          "pointer-events": "auto"
        });

        refresh();
      });
    });
  };
});
