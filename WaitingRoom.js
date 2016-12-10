function WaitingRoom() {
  var waitcheck = 0;
  $('#playercount').text(id);
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
                $('#playercount').text(id);
              }
          }
        });

        }
      }, 1000);
}
