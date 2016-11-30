
$(document).ready(function() {
    var GAME_STATE = {
        cardStack: [
            "knight", "knight", "knight", "knight", "knight",
            "knight", "knight", "knight", "knight", "knight",
            "knight", "knight", "knight", "knight",
            "old well", "the pit", "davis library", "sitterson", "bell tower",
            "road building", "road building",
            "monopoly", "monopoly", "volunteered for medical research",
            "volunteered for medical research"
        ]
    };

    /* Randomly draws a development card */
    function drawDevelopmentCard() {
        var arr = GAME_STATE.cardStack;
        var item = arr[Math.floor(Math.random()*arr.length)];

        switch (item) {
            case "knight":
                $("#cardOut").append("<div class = 'cards folt'> <img src = 'images/folt.gif'/></div>");
                break;
            case "old well":
                $("#cardOut").append("<div class = 'cards well'> <img src = 'images/well.gif'/></div>");
                break;
            case "the pit":
                $("#cardOut").append("<div class = 'cards pit'> <img src = 'images/pit.gif'/></div>");
                break;
            case "davis library":
                $("#cardOut").append("<div class = 'cards davis'> <img src = 'images/davis.gif'/></div>");
                break;
            case "sitterson":
                $("#cardOut").append("<div class = 'cards sitterson'> <img src = 'images/sitterson.gif'/></div>");
                break;
            case "bell tower":
                $("#cardOut").append("<div class = 'cards bell'> <img src = 'images/bell.gif'/></div>");
                break;
            case "road building":
                $("#cardOut").append("<div class = 'cards roadBuilding'> <img src = 'images/roadBuilding.gif'/></div>");
                break;
            case "monopoly":
                $("#cardOut").append("<div class = 'cards monopoly'> <img src = 'images/monopoly.gif'/></div>");
                break;
            case "volunteered for medical reseach":
                $("#cardOut").append("<div class = 'cards volunteer'> <img src = 'images/volunteer.gif'/></div>");
                break;
        }
    }

    drawDevelopmentCard();
});