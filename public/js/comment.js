function createNewCommentRow(post) {
  console.log(post);
  var formattedDate = new Date(post.createdAt);
  formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
  var newPostCard = $("<div>");
  newPostCard.addClass("card");
  var newPostCardHeading = $("<div>");
  newPostCardHeading.addClass("card-title");
  var deleteBtn = $("<button>");
  deleteBtn.text("x");
  deleteBtn.addClass("delete btn");
  var editBtn = $("<button>");
  editBtn.text("EDIT");
  editBtn.addClass("edit btn btn-info");
  var newPostTitle = $("<h2>");
  var newPostDate = $("<small>");
  var newPostAuthor = $("<h5>");
  newPostAuthor.text("Written by: " + post.Author.author_name);
  newPostAuthor.css({
    float: "right",
    color: "blue",
    "margin-top": "-10px"
  });
  var newPostCardBody = $("<div>");
  newPostCardBody.addClass("card-content");
  var newPostBody = $("<p>");
  newPostTitle.text(post.title + " ");
  newPostBody.text(post.body);
  newPostDate.text(formattedDate);
  newPostTitle.append(newPostDate);
  newPostCardHeading.append(deleteBtn);
  newPostCardHeading.append(editBtn);
  newPostCardHeading.append(upVoteBtn);
  newPostCardHeading.append(dwnVoteBtn);
  newPostCardHeading.append(chatBtn);
  newPostCardHeading.append(newPostTitle);
  newPostCardHeading.append(newPostAuthor);
  newPostCardBody.append(newPostBody);
  newPostCard.append(newPostCardHeading);
  newPostCard.append(newPostCardBody);
  newPostCard.data("post", post);
  return newPostCard;
}
