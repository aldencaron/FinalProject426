$(document).ready(function() {
    /* ********************* */
    /* ********************* */
    /* PART I - POST TESTER  */
    /* ********************* */
    /* ********************* */

    // Roads Table
    $("#form").submit(function(event) {
        event.preventDefault();
        var formData = $("#form").serialize();
        var url = $("#form").attr("action") + $("#form input[name='RoadID']").val();
        $.ajax({
            type: 'POST',
            url: url,
            data: formData
        }).done(function (response) {
            console.log(response);
        }).fail(function (response) {
            console.log("Error: " + response.responseText);
        });
    });

    // Players Table
    $("#form1").submit(function(event) {
        event.preventDefault();
        var formData = $("#form1").serialize();
        var url = $("#form1").attr("action") + $("#form1 input[name='PlayerID']").val();
        $.ajax({
            type: 'POST',
            url: url,
            data: formData
        }).done(function (response) {
            console.log(response);
        }).fail(function (response) {
            console.log("Error: " + response.responseText);
        });
    });

    // Tiles Table
    $("#form2").submit(function(event) {
        event.preventDefault();
        var formData = $("#form2").serialize();
        var url = $("#form2").attr("action") + $("#form2 input[name='TileID']").val();
        $.ajax({
            type: 'POST',
            url: url,
            data: formData
        }).done(function (response) {
            console.log(response);
        }).fail(function (response) {
            console.log("Error: " + response.responseText);
        });
    });

    // Colleges Table
    $("#form3").submit(function(event) {
        event.preventDefault();
        var formData = $("#form3").serialize();
        var url = $("#form3").attr("action") + $("#form3 input[name='CollegeID']").val();
        $.ajax({
            type: 'POST',
            url: url,
            data: formData
        }).done(function (response) {
            console.log(response);
        }).fail(function (response) {
            console.log("Error: " + response.responseText);
        });
    });

    // Cards Table
    $("#form4").submit(function(event) {
        event.preventDefault();
        var formData = $("#form4").serialize();
        var url = $("#form4").attr("action") + $("#form4 input[name='PlayerID']").val();
        $.ajax({
            type: 'POST',
            url: url,
            data: formData
        }).done(function (response) {
            console.log(response);
        }).fail(function (response) {
            console.log("Error: " + response.responseText);
        });
    });

    /* ********************* */
    /* ********************* */
    /* PART II - GET TESTER  */
    /* ********************* */
    /* ********************* */
});
