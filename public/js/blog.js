$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;
      userName = user.displayName;
      getPosts();
    } else {
      //no user signed in
      uid = null;
      window.location.replace("index.html");
    }
  });

  /* global moment */

  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  // Variable to hold our posts
  var posts;

  function getAuthor(uid) {
    authorId = uid || "";
    $.get("/api/posts" + uid, function(data) {
      if (!posts || !posts.length) {
        displayEmpty(author);
      } else {
        initializeRows();
      }
    });
  }

  // This function grabs posts from the database and updates the view
  function getPosts(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/posts" + authorId, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(author);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(function() {
      getPosts(postCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    console.log(post);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");

    var divCard = $("<div class='card'>");
    var cardHeader = $("<div class='card-content'>");
    var titleSpan = $("<span class='card-title activator white-text'>");
    var cardReveal = $("<div class='card-reveal'>");
    var revealBody = $("<p>");

    // var newPostCard = $("<div>");
    // newPostCard.addClass("card");
    // var newPostCardHeading = $("<div>");
    // newPostCardHeading.addClass("card-title");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn black waves-effect writeTheory");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info black waves-effect writeTheory");
    var upVoteBtn = $("<button>");
    upVoteBtn.addClass("upVote btn black waves-effect writeTheory");
    upVoteBtn.html('<i class="material-icons">arrow_upward</i>');
    var dwnVoteBtn = $("<button>");
    dwnVoteBtn.addClass("dwnVote btn black waves-effect writeTheory");
    dwnVoteBtn.html('<i class="material-icons">arrow_downward</i>');
    var chatBtn = $("<button>");
    chatBtn.addClass("chatBtn btn black waves-effect writeTheory");
    chatBtn.html('<i class="material-icons">comment</i>');

    revealBody.text(post.body);
    titleSpan.text(post.title);
    titleSpan.append(revealBody);
    cardHeader.append(titleSpan);
    divCard.append(cardHeader);
    return divCard;
    // var newPostTitle = $("<h2>");
    // var newPostDate = $("<small>");
    // var newPostAuthor = $("<h5>");
    // newPostAuthor.text("Written by: " + post.Author.author_name);
    // newPostAuthor.css({
    //   float: "right",
    //   color: "blue",
    //   "margin-top": "-10px"
    // });
    // var newPostCardBody = $("<div>");
    // newPostCardBody.addClass("card-content");
    // var newPostBody = $("<p>");
    // newPostTitle.text(post.title + " ");
    // newPostBody.text(post.body);
    // newPostDate.text(formattedDate);
    // newPostTitle.append(newPostDate);
    // newPostCardHeading.append(deleteBtn);
    // newPostCardHeading.append(editBtn);
    // newPostCardHeading.append(upVoteBtn);
    // newPostCardHeading.append(dwnVoteBtn);
    // newPostCardHeading.append(chatBtn);
    // newPostCardHeading.append(newPostTitle);
    // newPostCardHeading.append(newPostAuthor);
    // newPostCardBody.append(newPostBody);
    // newPostCard.append(newPostCardHeading);
    // newPostCard.append(newPostCardBody);
    // newPostCard.data("post", post);
    // return newPostCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {}
});
