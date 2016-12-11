$(document).ready(function() {
  var Road = function(Road_json) {
      this.RoadID = Road_json.RoadID;
      this.PlayerID = Road_json.PlayerID;
      this.Available = Road_json.Available;
  };
  var Player = function Player(Player_json) {
      this.PlayerID = Player_json.PlayerID;
      this.Username = Player_json.Username;
      this.RoadsCount= Player_json.RoadsCount;
      this.SoldiersCount = Player_json.SoldiersCount;
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
    this.Available = College_json.Available;
    this.University = College_json.University;
  }
  var DiceRoll = function DiceRoll(DiceRoll_json){
    this.DiceID = College_json.DiceID;
    this.RollResult = College_json.RollResult;
  }
})

var ret;
//console.log("here");
function getRoad(ID){
  var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
      $.ajax({url: url_base + "/SettlersOfCarolina.php/Roads/" + ID,
        type: "GET",
         dataType: "json",
         async:false,
           success: function(Road_json, status, jqXHR) {
            console.log(Road_json);
            ret = Road_json;
            },
           error: function(jqXHR, status, error) {
             console.log(jqXHR.responseText);
     }
   });
    return ret;
  }
  function updateRoad(Road){
      var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
        $.ajax({url: url_base + "/SettlersOfCarolina.php/Roads/" + Road.RoadID,
          type: "POST",
           dataType: "json",
           async:false,
           data: $(Road).serialize(),
           success: function(Road_json, status, jqXHR) {
            console.log(Road_json);
             return new Road(Road_json);},
             error: function(jqXHR, status, error) {
             console.log(jqXHR.responseText);
       }
     });
    }
   var ret1= getRoad(1);
   c = setInterval(function(){
    if(typeof ret1!= 'undefined'){
      //console.log(ret1);
      clearInterval(c);
    }
    else{

    }
  }, 100);

       function intervalstuff(){
         if(typeof t=='undefined'){
         }
         else{
           tester=true;
           console.log(t);
           clearInterval(c);
         }

       }

    var ret;
  function getRoadAJAX(ID){
    var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
        $.ajax({url:"/SettlersOfCarolina.php/Roads/"+ ID,
          type: "GET",
           dataType: "json",
           async:false,
             success: function(Road_json, status, jqXHR) {
                 console.log(Road_json);
             ret = Road_json;
              },
             error: function(jqXHR, status, error) {
             console.log(jqXHR.responseText);
       }
     });
      return ret;
    }

    function getPlayer(ID){
      var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
          $.ajax({url: url_base + "/SettlersOfCarolina.php/Players/"+ ID,
            type: "GET",
             dataType: "json",
               success: function(Player_json, status, jqXHR) {
                console.log("success");
               return new Player(Player_json);},
               error: function(jqXHR, status, error) {
               console.log(jqXHR.responseText);
         }
       });
      }
      function getCard(ID){
        var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
            $.ajax({url: url_base + "/SettlersOfCarolina.php/Cards/"+ ID,
              type: "GET",
               dataType: "json",
                 success: function(Card_json, status, jqXHR) {
                  console.log("success");
                 return new Card(Card_json);},
                 error: function(jqXHR, status, error) {
                 console.log(jqXHR.responseText);
           }
         });
        }
        function getTile(ID){
          var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
              $.ajax({url: url_base + "/SettlersOfCarolina.php/Tiles/"+ ID,
                type: "GET",
                 dataType: "json",
                   success: function(Tile_json, status, jqXHR) {
                    console.log("success");
                   return new Tile(Tile_json);},
                   error: function(jqXHR, status, error) {
                   console.log(jqXHR.responseText);
             }
           });
          }
          function getCollege(ID){
            var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                $.ajax({url: url_base + "/SettlersOfCarolina.php/Colleges/"+ ID,
                  type: "GET",
                   dataType: "json",
                     success: function(College_json, status, jqXHR) {
                        console.log("success");
                     return new College(College_json);},
                     error: function(jqXHR, status, error) {
                     console.log(jqXHR.responseText);
               }
             });
            }

          function getAllIDs(DBname){
              var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                $.ajax({url: url_base + "/SettlersOfCarolina.php/" + DBname,
                  type: "GET",
                   dataType: "json",
                     success: function(array, status, jqXHR) {
                     return array;},
                     error: function(jqXHR, status, error) {
               }
             });
            }



            function updateRoad(Road){
                var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                  $.ajax({url: url_base + "/SettlersOfCarolina.php/Roads/" + Road.RoadID,
                    type: "PSOT",
                     dataType: "json",
                     data: $(Road).serialize(),
                     success: function(Road_json, status, jqXHR) {
                       console.log("success");
                     return new Road(Road_json);},
                       error: function(jqXHR, status, error) {
                       console.log(jqXHR.responseText);
                 }
               });
             }
            function createRoad(Road){
              var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                $.ajax({url: url_base + "/SettlersOfCarolina.php/Roads",
                  type: "GET",
                   dataType: "json",
                   data: $(Road).serialize(),
                   success: function(Road_json, status, jqXHR) {
                     console.log("success");
                     return new Road(Road_json);},
                     error: function(jqXHR, status, error) {
                     console.log(jqXHR.responseText);
               }
             });
            }
            function updateCard(Card){
                var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                  $.ajax({url: url_base + "/SettlersOfCarolina.php/Cards/" + Card.CardID,
                    type: "GET",
                     dataType: "json",
                     data: $(Card).serialize(),
                     success: function(Card_json, status, jqXHR) {
                       console.log("success");
                     return new Card(Card_json);},
                       error: function(jqXHR, status, error) {
                       console.log(jqXHR.responseText);
                 }
               });
              }
            function createCard(Card){
              var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                $.ajax({url: url_base + "/SettlersOfCarolina.php/Cards",
                  type: "GET",
                   dataType: "json",
                   data: $(Card).serialize(),
                   success: function(Card_json, status, jqXHR) {
                     console.log("success");
                     return new Card(Card_json);},
                     error: function(jqXHR, status, error) {
                     console.log(jqXHR.responseText);
               }
             });
            }
            function updatePlayer(Player){
                var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                  $.ajax({url: url_base + "/SettlersOfCarolina.php/Players/" + Player.PlayerID,
                    type: "GET",
                     dataType: "json",
                     data: $(Player).serialize(),
                     success: function(Player_json, status, jqXHR) {
                       console.log("success");
                     return new Player(Player_json);},
                       error: function(jqXHR, status, error) {
                       console.log(jqXHR.responseText);
                 }
               });
              }
            function createPlayer(Player){
              var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                $.ajax({url: url_base + "/SettlersOfCarolina.php/Players",
                  type: "GET",
                   dataType: "json",
                   data: $(Player).serialize(),
                   success: function(Player_json, status, jqXHR) {
                     console.log("success");
                     return new Player(Player_json);},
                     error: function(jqXHR, status, error) {
                     console.log(jqXHR.responseText);
               }
             });
            }
            function updateCollege(College){
                var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                  $.ajax({url: url_base + "/SettlersOfCarolina.php/Colleges/" + College.CollegeID,
                    type: "GET",
                     dataType: "json",
                     data: $(College).serialize(),
                     success: function(College_json, status, jqXHR) {
                       console.log("success");
                     return new College(College_json);},
                       error: function(jqXHR, status, error) {
                       console.log(jqXHR.responseText);
                 }
               });
              }
            function createCollege(College){
              var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                $.ajax({url: url_base + "/SettlersOfCarolina.php/Colleges",
                  type: "GET",
                   dataType: "json",
                   data: $(College).serialize(),
                   success: function(College_json, status, jqXHR) {
                     console.log("success");
                     return new College(College_json);},
                     error: function(jqXHR, status, error) {
                     console.log(jqXHR.responseText);
               }
             });
            }
            function updateTile(Tile){
                var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                  $.ajax({url: url_base + "/SettlersOfCarolina.php/Tiles/" + Tile.TileID,
                    type: "GET",
                     dataType: "json",
                     data: $(Tile).serialize(),
                     success: function(Tile_json, status, jqXHR) {
                       console.log("success");
                     return new Tile(Tile_json);},
                       error: function(jqXHR, status, error) {
                       console.log(jqXHR.responseText);
                 }
               });
              }
            function createTile(Tile){
              var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
                $.ajax({url: url_base + "/SettlersOfCarolina.php/Tiles",
                  type: "GET",
                   dataType: "json",
                   data: $(Tile).serialize(),
                   success: function(Tile_json, status, jqXHR) {
                     console.log("success");
                     return new Tile(Tile_json);},
                     error: function(jqXHR, status, error) {
                     console.log(jqXHR.responseText);
               }
             });
           };
