$(document).ready(function() {
  var Road = function Road(Road_json) {
      this.RoadID = Road_json.RoadID;
      this.PlayerID = Road_json.PlayerID;
      this.Available= Road_json.Available;
  };

  var Player = function Player(Player_json) {
      this.PlayerID = Player_json.PlayerID;
      this.Username = Player_json.Username;
      this.RoadsCount= Player_json.RoadsCount;
      this.SoldiersCount = Player_json.RoadsCount;
      this.Points = Player_json.Points;
  };

  var Card = function Card(Card_json){
      this.PlayerID = Card_json.PlayerID;
      this.Ram = Card_json.Ram;
      this.Ramen = Card_json.Ramen;
      this.Brick = Card_json.Brick;
      this.Roads = Card_json.Roads;
      this.Knight = Card_json.Knight;
      this.Book = Card_json.Book;
      this.OldWell = Card_json.OldWell;
      this.ThePit = Card_json.ThePit;
      this.DavisLibrary = Card_json.DavisLibrary;
      this.Sitterson = Card_json.Sitterson;
      this.BellTower = Card_json.BellTower;
      this.Volunteer = Card_json.Volunteer;
      this.Monopoly = Card_json.Monopoly;
      this.Basketball = Card_json.Basketball;
  }

  var Tile = function Tile(Tile_json){
    this.TileID = Tile_json.TileID;
    this.Robber = Tile_json.Robber;
  }
  var College = function College(College_json){
    this.CollegeID = College_json.CollegeID;
    this.PlayerID = College_json.PlayerID;
    this.Available= College_json.Available;
    this.University= College_json.University;
  }

  var ret1= getPlayerAJAX(1);
  var ret2= getRoadAJAX(1);
  var ret3= getCardAJAX(1);
  var ret4= getCollegeAJAX(1);

  function getRoadAJAX(ID){
    var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
        $.ajax({url: url_base + "/SettlersOfCarolina.php/Roads/"+ ID,
          type: "GET",
           dataType: "json",
             success: function(Road_json, status, jqXHR) {
               alert("success");
             return new Road(Road_json);},
             error: function(jqXHR, status, error) {
             alert(jqXHR.responseText);
       }
     });
    }

    function getPlayerAJAX(ID){
      var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
          $.ajax({url: url_base + "/SettlersOfCarolina.php/Players/"+ ID,
            type: "GET",
             dataType: "json",
               success: function(Player_json, status, jqXHR) {
                alert("success");
               return new Player(Player_json);},
               error: function(jqXHR, status, error) {
               alert(jqXHR.responseText);
         }
       });
      }
      function getCardAJAX(ID){
        var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
            $.ajax({url: url_base + "/SettlersOfCarolina.php/Cards/"+ ID,
              type: "GET",
               dataType: "json",
                 success: function(Card_json, status, jqXHR) {
                  alert("success");
                 return new Card(Card_json);},
                 error: function(jqXHR, status, error) {
                 alert(jqXHR.responseText);
           }
         });
        }
        function getTileAJAX(ID){
          var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
              $.ajax({url: url_base + "/SettlersOfCarolina.php/Tiles/"+ ID,
                type: "GET",
                 dataType: "json",
                   success: function(Tile_json, status, jqXHR) {
                    alert("success");
                   return new Tile(Tile_json);},
                   error: function(jqXHR, status, error) {
                   alert(jqXHR.responseText);
             }
           });
          }
          function getCollegeAJAX(ID){
            var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                $.ajax({url: url_base + "/SettlersOfCarolina.php/Colleges/"+ ID,
                  type: "GET",
                   dataType: "json",
                     success: function(College_json, status, jqXHR) {
                        alert("success");
                     return new College(College_json);},
                     error: function(jqXHR, status, error) {
                     alert(jqXHR.responseText);
               }
             });
            }

        

  });
