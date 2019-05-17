$(function () {
    $(".upVote").on("click", function (event) {
        var id = $(this).attr("id");

        var uLike = {
            likes: 1
        };

        // Send the PUT request.
        $.ajax("/api/author/" + id, {
            type: "PUT",
            data: uLike
        }).then(
            function () {
                console.log("liked");
                // Reload the page to get the updated list
                location.reload();
            });
    });

    $(".dwnVote").on("click", function (event) {
        var id = $(this).attr("id");

        var uDislike = {
            dislikes: 1
        };
        // Send the PUT request.
        $.ajax("/api/author/" + id, {
            type: "PUT",
            data: uDislike
        }).then(
            function () {
                console.log("disliked");
                // Reload the page to get the updated list
                location.reload();
            });
    })

    
});
