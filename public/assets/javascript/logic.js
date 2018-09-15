var currentURL = window.location.origin;

$(document).ready(function () {
    // Modal ready upon start
    $(".modal").modal();

    $(".comments").on("click", function () {
        $("#save").empty();
        $("#comments").empty();
        // Saves the article id
        var thisId = $(this).attr("data-id");

        // Makes an AJAX call for the article
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            // adds the note information to the page
            .done(function (data) {
                $("#comments").append("<h5 class='notesArticle'>" + data.title + "</h5>");
                $("#comments").append("<input id='titleInput' name='title' placeholder='Add title'>");
                $("#comments").append("<textarea id='bodyInput' name='body' placeholder='Add comment'></textarea>");
                $("#save").append("<button data-id=' + data._id + ' class='modal-close waves-effect waves-red btn-flat'>Save</button>");
                if (data.notes) {
                    $("#titleInput").val(data.notes.title);
                    $("#bodyInput").val(data.notes.body);
                }

            });
    })

    // Save comments when clicked
    $("#save").on("click", function () {
        console.log("Saved")
        // grabs the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        // runs a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // captures from title input
                title: $("#titleInput").val(),
                // takes values from note textarea
                body: $("#bodyInput").val()
            }
        })
            .done(function (data) {
                // logs the response
                console.log(data);
                // empties the notes section
                $("#comments").empty();
            });
    })

    $(".saveArticle").on("click", function () {
        console.log("save button")
        var articleId = $(this).attr("data-id");
        var articleToSave = $(this).parent().parent().parent();
        $.post({
            url: currentURL + "/save",
            data: {
                articleId: articleId
            }
        })
            .done(function (data) {
                console.log(data);
                articleToSave.remove();
            })
            .fail(function (error) {
                console.log(error);
            })
    })

    $(".unsaveArticle").on("click", function () {
        console.log("remove save button")
    })

    $(".hideArticle").on("click", function () {
        console.log("hide button")
    })
});
