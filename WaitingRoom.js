function WaitingRoom() {
  var waitcheck = 0;
  $('#playercount').text(id);
  if(id<=4){
  var waitingroom= setInterval(function(){
    if(waitcheck){
      clearInterval(waitingroom);
    }
    else{
          $.ajax({
            url: "SettlersOfCarolina.php/Players/",
            type: "GET",
            dataType: "JSON",
            success: function(response) {
              if(response.length>=4){
              document.body.style.backgroundColor = "white";
              $("#top_container").show();
              $('#waitingRoom').hide();
              RunGame();
              waitcheck=1;
              }
              else{
                $('#playercount').text(response.length);
                $('#playerinfo_waiting').text("Username: "+ username + ", player: " + id);
              }
          }
        });

        }
      }, 1000);
    }
    else{
      $('#playerinfo_waiting').text("Please wait, you are Player " + id + " and there are currently four people playing a game");
    }
}
