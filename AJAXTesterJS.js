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
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            setConsoleOutput(response.responseText);
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
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            setConsoleOutput(response.responseText);
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
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            setConsoleOutput(response.responseText);
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
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            setConsoleOutput(response.responseText);
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
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            setConsoleOutput(response.responseText);
        });
    });

    /* ********************* */
    /* ********************* */
    /* PART II - GET TESTER  */
    /* ********************* */
    /* ********************* */

    // Roads Table
    $("#formGET").submit(function(event) {
        event.preventDefault();
        var formData = $("#formGET").serialize();
        var url = $("#formGET").attr("action") + $("#formGET input[name='RoadID']").val();
        $.ajax({
            type: 'GET',
            url: url,
            data: formData
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            setConsoleOutput(response.responseText);
        });
    });

    // Players Table
    $("#form1GET").submit(function(event) {
        event.preventDefault();
        var formData = $("#form1GET").serialize();
        var url = $("#form1GET").attr("action") + $("#form1GET input[name='PlayerID']").val();
        $.ajax({
            type: 'GET',
            url: url,
            data: formData
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            setConsoleOutput(response.responseText);
        });
    });

    // Tiles Table
    $("#form2GET").submit(function(event) {
        event.preventDefault();
        var formData = $("#form2GET").serialize();
        var url = $("#form2GET").attr("action") + $("#form2GET input[name='TileID']").val();
        $.ajax({
            type: 'GET',
            url: url,
            data: formData
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            setConsoleOutput(response.responseText);
        });
    });

    // Colleges Table
    $("#form3GET").submit(function(event) {
        event.preventDefault();
        var formData = $("#form3GET").serialize();
        var url = $("#form3GET").attr("action") + $("#form3GET input[name='CollegeID']").val();
        $.ajax({
            type: 'GET',
            url: url,
            data: formData
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            setConsoleOutput(response.responseText);
        });
    });

    // Cards Table
    $("#form4GET").submit(function(event) {
        event.preventDefault();
        var formData = $("#form4GET").serialize();
        var url = $("#form4GET").attr("action") + $("#form4GET input[name='PlayerID']").val();
        $.ajax({
            type: 'GET',
            url: url,
            data: formData
        }).done(function(response) {
            console.log(response);
            setConsoleOutput(response);
        }).fail(function(response) {
            console.log("Error: " + response.responseText);
            var temp = response.responseText;
            temp = temp.substring(2, temp.length - 1);
            setConsoleOutput(temp);
        });
    });

    /* ********************* */
    /* ********************* */
    /* PART III - CONSOLE    */
    /* ********************* */
    /* ********************* */

    /* Flashing effect of console */
    setInterval(function() {
        $("#flash span").animate({
            color: "#151515"
        }, 500).animate({
            color: "#7AFA4E"
        }, 500);
    }, 1000);

    /* Updates console output */
    function setConsoleOutput(response) {
        var res = JSON.stringify(response).split(",");
        res[0] = res[0].replace("{", "");
        res[res.length - 1] = res[res.length - 1].replace("}", "");
        res[0] = res[0].replace(/["']/g, "");
        res[res.length - 1] = res[res.length - 1].replace(/["']/g, "");

        for (var i = 0; i < res.length; i++) {
            var $output = $("<p>" + res[i] + "</p>");
            $("#consoleOutput").append($output);
        }
        $("#consoleOutput").append($("<br />"));
    }

    /* Clears the entire console */
    function clearEntireConsole() {
        $("#consoleOutput").empty();
        $("#userInput").empty();
        input = "";
    }

    /* Clears the user input */
    function clearUserInput() {
        $("#userInput").empty();
        input = "";
    }

    /* Clears the console only */
    function clearConsole() {
        $("#consoleOutput").empty();
    }

    /* Console commands */
    var input = "";
    $("#userInput").focus();
    $("#rightmostContainer").click(function() {
        $("#userInput").focus();
    });
    $("#userInput").bind('keydown', function(event) {
        if ((event.keyCode == 8 || event.keyCode == 32) ||
            (event.keyCode == 38 || event.keyCode == 39 ||
            event.keyCode == 40 || event.keyCodee == 41)) {
            event.preventDefault();
            if (event.keyCode == 32) { // Space
                input = input + " ";
                $("#userInput").html($("#userInput").text() + " ");
            } else if (event.keyCode == 8) { // Backspace
                input = input.substring(0, input.length - 1);
                $("#userInput").html(input);
            }
        }
    });
    $('#userInput').bind('keypress', function(event) {
        var charStr = String.fromCharCode(event.which);
        var key = event.which;
        if ((key >= 48 || key <= 90) || (key >= 186 && key <= 222)) {
            input += charStr;
            $("#userInput").html($("#userInput").text() + charStr);
        }

        if (event.keyCode == 13) { // Enter
            input = $.trim(input);
            var temp = input.toLowerCase();

            /* Either a console command is given, or a
            SQL query is given */
            if (temp == "clear") {
                clearEntireConsole();
            } else {
                $.ajax({
                    type: "GET",
                    url: "AJAXTesterPHP.php/",
                    data: {"request": input}
                }).done(function(response) {
                    console.log(response);
                    setConsoleOutput(response);
                }).fail(function(response) {
                    console.log(response);
                    setConsoleOutput();
                });
                clearUserInput();
            }

        }
    });
});