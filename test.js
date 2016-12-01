$(document).ready(function() {
  var Road = function(Road_json) {
      this.RoadID = Road_json.RoadID;
      this.PlayerID = Road_json.PlayerID;
      this.Available= todo_json.Available;
  };


    $.ajax(url_base + "/SettlersOfCarolina.php/Road/1",
     {type: "GET",
       dataType: "json",
       data: $(this).serialize(),
       success: function(Road_json, status, jqXHR) {
       var r = new Road(Road_json);
       alert(r.RoadID);
   },
       error: function(jqXHR, status, error) {
       alert(jqXHR.responseText);
   }});


 });
