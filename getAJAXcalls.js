$(document).ready(function() {
  var Road = function(Road_json) {
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

  // var ret1= getPlayerAJAX(1);
  // // var ret2= getRoadAJAX(1);
  // // console.log(ret2);
  // // var count = 0;
  // // while(count!=10000000000){
  // //   count++;
  // // }
  // // console.log(ret2);
  // // alert(ret2);
  // var ret3= getCardAJAX(1);
  // var ret4= getCollegeAJAX(1);
  // var ret5= updateRoad(ret2);
  // alert(ret5.RoadID);
    // var ret5= updateRoad(ret2);
    // alert(ret5.Basketball);

    //calling getRoadAJAX
    //(want to make stop here)
    //continues to alert
    //roadajax aactually finishes in background
    var tester=false;
    var t;
    var c = setInterval(intervalstuff, 1);
    var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
        $.ajax({url: url_base + "/SettlersOfCarolina.php/Players/1",
          type: "GET",
           dataType: "json",
             success: function(Player_json, status, jqXHR) {
             alert("success");
              t=Player_json;},
             error: function(jqXHR, status, error) {
             alert(jqXHR.responseText);
       }
     });

       function intervalstuff(){
         if(typeof t=='undefined'){
         }
         else{
           tester=true;
           alert(t);
           clearInterval(c);
         }

       }

    var ret;
  function getRoadAJAX(ID){
    var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";

        $.ajax({url: url_base + "/SettlersOfCarolina.php/Roads/"+ ID,
          type: "GET",
           dataType: "json",
             success: function(Road_json, status, jqXHR) {
                 console.log(Road_json);
             ret = Road_json;
              },
             error: function(jqXHR, status, error) {
             alert(jqXHR.responseText);
       }
     });
      return ret;
    }

    console.log(getRoadAJAX(1));



    // function getPlayerAJAX(ID){
    //   var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //       $.ajax({url: url_base + "/SettlersOfCarolina.php/Players/"+ ID,
    //         type: "GET",
    //          dataType: "json",
    //            success: function(Player_json, status, jqXHR) {
    //             alert("success");
    //            return new Player(Player_json);},
    //            error: function(jqXHR, status, error) {
    //            alert(jqXHR.responseText);
    //      }
    //    });
    //   }
    //   function getCardAJAX(ID){
    //     var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //         $.ajax({url: url_base + "/SettlersOfCarolina.php/Cards/"+ ID,
    //           type: "GET",
    //            dataType: "json",
    //              success: function(Card_json, status, jqXHR) {
    //               alert("success");
    //              return new Card(Card_json);},
    //              error: function(jqXHR, status, error) {
    //              alert(jqXHR.responseText);
    //        }
    //      });
    //     }
    //     function getTileAJAX(ID){
    //       var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //           $.ajax({url: url_base + "/SettlersOfCarolina.php/Tiles/"+ ID,
    //             type: "GET",
    //              dataType: "json",
    //                success: function(Tile_json, status, jqXHR) {
    //                 alert("success");
    //                return new Tile(Tile_json);},
    //                error: function(jqXHR, status, error) {
    //                alert(jqXHR.responseText);
    //          }
    //        });
    //       }
    //       function getCollegeAJAX(ID){
    //         var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //             $.ajax({url: url_base + "/SettlersOfCarolina.php/Colleges/"+ ID,
    //               type: "GET",
    //                dataType: "json",
    //                  success: function(College_json, status, jqXHR) {
    //                     alert("success");
    //                  return new College(College_json);},
    //                  error: function(jqXHR, status, error) {
    //                  alert(jqXHR.responseText);
    //            }
    //          });
    //         }
    //
    //       function getAllIDs(DBname){
    //           var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //             $.ajax({url: url_base + "/SettlersOfCarolina.php/" + DBname,
    //               type: "GET",
    //                dataType: "json",
    //                  success: function(array, status, jqXHR) {
    //                     alert("success");
    //                  return array;},
    //                  error: function(jqXHR, status, error) {
    //                  alert(jqXHR.responseText);
    //            }
    //          });
    //         }
    //         function updateRoad(Road){
    //             var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //               $.ajax({url: url_base + "/SettlersOfCarolina.php/Roads/" + Road.RoadID,
    //                 type: "GET",
    //                  dataType: "json",
    //                  data: $(Road).serialize(),
    //                  success: function(Road_json, status, jqXHR) {
    //                    alert("success");
    //                  return new Road(Road_json);},
    //                    error: function(jqXHR, status, error) {
    //                    alert(jqXHR.responseText);
    //              }
    //            });
    //           }
    //         function createRoad(Road){
    //           var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //             $.ajax({url: url_base + "/SettlersOfCarolina.php/Roads",
    //               type: "GET",
    //                dataType: "json",
    //                data: $(Road).serialize(),
    //                success: function(Road_json, status, jqXHR) {
    //                  alert("success");
    //                  return new Road(Road_json);},
    //                  error: function(jqXHR, status, error) {
    //                  alert(jqXHR.responseText);
    //            }
    //          });
    //         }
    //         function updateCard(Card){
    //             var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //               $.ajax({url: url_base + "/SettlersOfCarolina.php/Cards/" + Card.CardID,
    //                 type: "GET",
    //                  dataType: "json",
    //                  data: $(Card).serialize(),
    //                  success: function(Card_json, status, jqXHR) {
    //                    alert("success");
    //                  return new Card(Card_json);},
    //                    error: function(jqXHR, status, error) {
    //                    alert(jqXHR.responseText);
    //              }
    //            });
    //           }
    //         function createCard(Card){
    //           var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //             $.ajax({url: url_base + "/SettlersOfCarolina.php/Cards",
    //               type: "GET",
    //                dataType: "json",
    //                data: $(Card).serialize(),
    //                success: function(Card_json, status, jqXHR) {
    //                  alert("success");
    //                  return new Card(Card_json);},
    //                  error: function(jqXHR, status, error) {
    //                  alert(jqXHR.responseText);
    //            }
    //          });
    //         }
    //         function updatePlayer(Player){
    //             var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //               $.ajax({url: url_base + "/SettlersOfCarolina.php/Players/" + Player.PlayerID,
    //                 type: "GET",
    //                  dataType: "json",
    //                  data: $(Player).serialize(),
    //                  success: function(Player_json, status, jqXHR) {
    //                    alert("success");
    //                  return new Player(Player_json);},
    //                    error: function(jqXHR, status, error) {
    //                    alert(jqXHR.responseText);
    //              }
    //            });
    //           }
    //         function createPlayer(Player){
    //           var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //             $.ajax({url: url_base + "/SettlersOfCarolina.php/Players",
    //               type: "GET",
    //                dataType: "json",
    //                data: $(Player).serialize(),
    //                success: function(Player_json, status, jqXHR) {
    //                  alert("success");
    //                  return new Player(Player_json);},
    //                  error: function(jqXHR, status, error) {
    //                  alert(jqXHR.responseText);
    //            }
    //          });
    //         }
    //         function updateCollege(College){
    //             var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //               $.ajax({url: url_base + "/SettlersOfCarolina.php/Colleges/" + College.CollegeID,
    //                 type: "GET",
    //                  dataType: "json",
    //                  data: $(College).serialize(),
    //                  success: function(College_json, status, jqXHR) {
    //                    alert("success");
    //                  return new College(College_json);},
    //                    error: function(jqXHR, status, error) {
    //                    alert(jqXHR.responseText);
    //              }
    //            });
    //           }
    //         function createCollege(College){
    //           var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //             $.ajax({url: url_base + "/SettlersOfCarolina.php/Colleges",
    //               type: "GET",
    //                dataType: "json",
    //                data: $(College).serialize(),
    //                success: function(College_json, status, jqXHR) {
    //                  alert("success");
    //                  return new College(College_json);},
    //                  error: function(jqXHR, status, error) {
    //                  alert(jqXHR.responseText);
    //            }
    //          });
    //         }
    //         function updateTile(Tile){
    //             var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //               $.ajax({url: url_base + "/SettlersOfCarolina.php/Tiles/" + Tile.TileID,
    //                 type: "GET",
    //                  dataType: "json",
    //                  data: $(Tile).serialize(),
    //                  success: function(Tile_json, status, jqXHR) {
    //                    alert("success");
    //                  return new Tile(Tile_json);},
    //                    error: function(jqXHR, status, error) {
    //                    alert(jqXHR.responseText);
    //              }
    //            });
    //           }
    //         function createTile(Tile){
    //           var url_base= "http://wwwp.cs.unc.edu/Courses/comp426-f16/users/mhb/final";
    //             $.ajax({url: url_base + "/SettlersOfCarolina.php/Tiles",
    //               type: "GET",
    //                dataType: "json",
    //                data: $(Tile).serialize(),
    //                success: function(Tile_json, status, jqXHR) {
    //                  alert("success");
    //                  return new Tile(Tile_json);},
    //                  error: function(jqXHR, status, error) {
    //                  alert(jqXHR.responseText);
    //            }
    //          });
    //         }
    //

  });
