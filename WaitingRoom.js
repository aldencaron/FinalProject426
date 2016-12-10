function WaitingRoom() {
  var waitcheck = 0;
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

              $("#top_container").show();
              $('#waitingRoom').hide();
              RunGame();
              waitcheck=1;
              }
              else{
                $('#playercount').innerHTML = id;
              }
          }
        });

        }
      }, 1000);
}
