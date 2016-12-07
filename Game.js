// Event types
var SETTLERS_CONSTANTS =
{
  // Game sections
  REGISTERING_PLAYERS: 0,
  SETTING_UP_BOARD: 1,
  HOME_PLAYER: 2,
  OTHER_PLAYER_ONE: 3,
  OTHER_PLAYER_TWO: 4,
  OTHER_PLAYER_THREE: 5,
  FINISHED: 6,

  // Events
  SETUP_TURN_EVENT: 0,
  DICE_ROLL_EVENT:1,
  ROBBER_EVENT: 2,
  BUY_EVENT: 3,
  TRADE_EVENT: 4,
  TURN_CHANGE_EVENT: 5
};

// =============================================================================
// Full Game Object
// =============================================================================
var SettlersGame = function() {

  // Set up images
  var imageNames = ["images/field.jpg", "images/paper.jpg",  "images/balltexture.jpg",
  "images/brickwall.jpg", "images/pasta.jpg",  "images/desert.jpg"];
  var images = [];
  for (var i = 0; i < imageNames.length; i++) {
    var image = new Image();
    image.src = imageNames[i];
    images.push(image);
  }

  // Parameters
  this.size = 60;
  this.width = Math.floor(Math.sqrt(3) * this.size * 5 + 1);
  this.x_initial = this.width / 2 - (Math.sqrt(3) * this.size) + 8;
  this.y_initial = 98;
  this.num_sides = 6;

  this.num_pieces = 19;
  this.num_colleges = 54;
  this.num_roads = 73;


  // Game objects
  this.tiles = [];
  this.colleges = [];
  this.roads = [];
  this.board;
  this.player;
  this.other_players = [];
  this.registered_event_handlers = {};

  this.turn_number = 0;
  this.status;

  // ===========================================================================
  // Dice rolling function, takes in number of dice to roll and returns sum
  // ===========================================================================
  this.rollDice = function(num_dice) {
    var sum = 0;
    for (var i = 0; i < num_dice; i++) {
      sum += (Math.floor(Math.random() * 6) + 1);
    }
    return sum;
  }

  // College objects
  var gameCollege = function(x, y, tiles, id) {
    this.id = id; // ID assigned client side
    this.x = x; // x value of center
    this.y = y; // y value of center
    this.tiles = tiles; // list of tiles it borders
    this.used = false; // used by a player
    this.available = true; // whether or not can be bought by player
    this.too_close = false; // for the one away restriction
    this.university = false; // if upgraded to university
    this.radius = 8; // for drawing purposes
    this.player = null; // which player owns
    this.roads = []; // list of connecting roads
  }

  // Road Objects
  var gameRoad = function(college1, college2, id) {
    this.id = id; // ID assigned client side
    this.start_x = college1.x; // starting x
    this.start_y = college1.y; // starting y
    this.end_x = college2.x; // ending x
    this.end_y = college2.y; // ending y
    this.x_center = (this.start_x + this.end_x)/2; // road center x
    this.y_center = (this.start_y + this.end_y)/2; // road center y
    this.connections = [college1, college2]; // connecting colleges
    this.available = false; // whether or not player can buy
    this.used = false; // if owned by player
    this.radius = 10; // for drawing purposes
    this.player = null; // which player owns
  }

  // Tile objects
  var gameTile = function(image, type, number, id) {
    this.id = id; // Assigned client side
    this.image = image; // background image
    this.type = type; // image type
    this.resource; // corresponding resource name
    this.number = number; // number on tile
    this.x_coords = []; // x coords of tile
    this.y_coords = []; // y coords of tile
    this.colleges = []; // colleges on tile
    this.robber = false; // whether or not has robber
  }

  // Client player
  var gamePlayer = function() {
    this.id; // player id
    this.username; // player username
    this.points = 0; // number of points
    this.color = "green"; // player color
    this.num_cards = 0; // number of resource cards
    this.cards = []; // cards array
    this.cards["ramen"] = 0;
    this.cards["book"] = 0;
    this.cards["ram"] = 0;
    this.cards["brick"] = 0
    this.cards["basketball"] = 0;
    this.cards["knight"] = 0;
    this.cards["victory_points"] = [];
    this.cards["victory_points"]["oldwell"] = 0;
    this.cards["victory_points"]["davis"] = 0;
    this.cards["victory_points"]["pit"] = 0;
    this.cards["victory_points"]["sitterson"] = 0;
    this.cards["victory_points"]["bell"] = 0;
    this.cards["monopoly"] = 0;
    this.cards["volunteer"] = 0;
    this.cards["roads"] = 0;
    this.colleges = []; // owned colleges
    this.roads = []; // owned roads
  }

  // Other players
  var gameOtherPlayer = function(color){
    this.num_cards = 0;
    this.colleges = [];
    this.roads = [];
    this.color = color;
    this.knights_count = 0; // for largest army purposes
    this.points;
  }

  // Make one board object per game
  this.gameBoard = function() {

    //==========================================================================
    // Set up tiles
    // =========================================================================

    var pieces_placement = [];

    for (var i = 0; i < this.num_pieces; i++) {
      var random = Math.floor(Math.random() * this.num_pieces);
      while (pieces_placement[random] != null) {
        random = Math.floor(Math.random() * this.num_pieces);
      }
      pieces_placement[random] = i;
    }

    this.pieces_placement = pieces_placement;
    this.numbers_placement = [6, 5, 9, 4, 3, 8, 10, 6, 5, 9, 12, 3, 2, 10, 11, 11, 4, 8];

    // Need certain amounts of each pattern type
    this.pieces = [images[0], images[0], images[0], images[0],
    images[1], images[1], images[1], images[1],
    images[2], images[2], images[2],
    images[3], images[3], images[3],
    images[4], images[4], images[4], images[4],
    images[5]];

    // Set up tile types
    this.types = ["FIELD", "FIELD", "FIELD", "FIELD", "PAPER", "PAPER", "PAPER", "PAPER",
    "BALLTEXTURE", "BALLTEXTURE", "BALLTEXTURE", "BRICK", "BRICK", "BRICK", "PASTA", "PASTA", "PASTA", "PASTA", "DESERT"];

    // Set up tile coordinates
    var x_center, y_center;
    var x_centers = [];
    var y_centers = [];


    for (var x = 0; x < 3; x++) {
      x_centers.push(this.x_initial + (Math.sqrt(3) * this.size * x));
      y_centers.push(this.y_initial);
    }
    for (var x = 0; x < 4; x++) {
      x_centers.push(this.x_initial - ((1 / 2) * Math.sqrt(3) * this.size) + (Math.sqrt(3) * this.size * x));
      y_centers.push(this.y_initial + (3 / 2 * this.size));
    }
    for (var x = 0; x < 5; x++) {
      x_centers.push(this.x_initial - (Math.sqrt(3) * this.size) + (Math.sqrt(3) * this.size * x));
      y_centers.push(this.y_initial + (3 * this.size));
    }
    for (var x = 0; x < 4; x++) {
      x_centers.push(this.x_initial - ((1 / 2) * Math.sqrt(3) * this.size) + (Math.sqrt(3) * this.size * x));
      y_centers.push(this.y_initial + (3 * (3 / 2) * this.size));
    }
    for (var x = 0; x < 3; x++) {
      x_centers.push(this.x_initial + (Math.sqrt(3) * this.size * x));
      y_centers.push(this.y_initial + (6 * this.size));
    }

    for (var i = 0; i < this.num_pieces; i++) {
      var tile_image = this.pieces[this.pieces_placement[i]];
      var tile_type = this.types[this.pieces_placement[i]];

      var tile_number;
      if (tile_type == "DESERT") {
        tile_number = 0;
        this.numbers_placement.splice(i, 0, 0);
      } else {
        tile_number = this.numbers_placement[i];
      }
      var new_tile = new gameTile(tile_image, tile_type, tile_number, i);
      switch(new_tile.type){
        case "DESERT":
        new_tile.robber = true;
        new_tile.resource = null;
        break;
        case "PASTA":
        new_tile.resource = "ramen";
        break;
        case "PAPER":
        new_tile.resource = "book";
        break;
        case "FIELD":
        new_tile.resource = "ram";
        break;
        case "BRICK":
        new_tile.resource = "brick";
        break;
        case "BALLTEXTURE":
        new_tile.resource = "basketball";
        break;
      }
      if(new_tile.type == "DESERT") {
        new_tile.robber = true;

      }
      this.tiles.push(new_tile);
      new_tile.x_center = x_centers[i];
      new_tile.y_center = y_centers[i];
      new_tile.x_coords[0] = new_tile.x_center + this.size * Math.sin(0);
      new_tile.y_coords[0] = new_tile.y_center + this.size * Math.cos(0);
      for (var j = 1; j <= this.num_sides; j++) {
        new_tile.x_coords[j] = new_tile.x_center + this.size * Math.sin(j * 2 * Math.PI / this.num_sides);
        new_tile.y_coords[j] = new_tile.y_center + this.size * Math.cos(j * 2 * Math.PI / this.num_sides);
      }
    }

    // =========================================================================
    // Set up colleges
    // =========================================================================

    var colleges_tiles = [0, 1, 2, 0, 1, 2, 2, 0, 1, 2, 2, 3, 4, 5, 6, 6, 3, 4, 5, 6, 6, 7, 8, 9, 10, 11, 11,
      7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 15, 12, 13, 14, 15, 15, 16, 17, 18, 18, 16, 17, 18, 18, 16, 17, 18
    ];
    var colleges_coords = [3, 3, 3, 4, 4, 4, 2, 5, 5, 5, 1, 4, 4, 4, 4, 2, 5, 5, 5, 5, 1, 4, 4, 4, 4, 4, 2,
      5, 5, 5, 5, 5, 1, 4, 4, 4, 4, 2, 5, 5, 5, 5, 1, 4, 4, 4, 2, 5, 5, 5, 1, 0, 0, 0
    ];
    var colleges_adj_tiles = [
      [0],
      [1],
      [2],
      [0],
      [0, 1],
      [1, 2],
      [2],
      [0, 3],
      [0, 1, 4],
      [1, 2, 5],
      [2, 6],
      [3],
      [0, 3, 4],
      [1, 4, 5],
      [2, 5, 6],
      [6],
      [3, 7],
      [3, 4, 8],
      [4, 5, 9],
      [5, 6, 10],
      [6, 11],
      [7],
      [3, 7, 8],
      [4, 8, 9],
      [5, 9, 10],
      [6, 10, 11],
      [11],
      [7],
      [7, 8, 11],
      [8, 9, 13],
      [9, 10, 14],
      [10, 11, 15],
      [11],
      [7, 12],
      [8, 12, 13],
      [9, 13, 14],
      [10, 14, 15],
      [11, 15],
      [12],
      [12, 13, 16],
      [13, 14, 17],
      [14, 15, 18],
      [15],
      [12, 16],
      [13, 16, 17],
      [14, 17, 18],
      [15, 18],
      [16],
      [16, 17],
      [17, 18],
      [18],
      [16],
      [17],
      [18]
    ];

    var colleges = []
    for (var i = 0; i < this.num_colleges; i++) {
      var adj_tiles_loop = [];
      for (var j = 0; j < colleges_adj_tiles[i].length; j++) {
        adj_tiles_loop.push(this.tiles[colleges_adj_tiles[i][j]]);
      }
      colleges[i] = new gameCollege(this.tiles[colleges_tiles[i]].x_coords[colleges_coords[i]],
        this.tiles[colleges_tiles[i]].y_coords[colleges_coords[i]], adj_tiles_loop, i);
    }

    this.colleges = colleges;

    // =========================================================================
    // Set up roads
    // =========================================================================
    var roads = [];
    var connections = [
        [3, 0],
        [0, 4],
        [4, 1],
        [1, 5],
        [5, 2],
        [2, 6],
        [3, 7],
        [4, 8],
        [5, 9],
        [6, 10],
        [11, 7],
        [7, 12],
        [12, 8],
        [8, 13],
        [13, 9],
        [9, 14],
        [14, 10],
        [10, 15],
        [11, 16],
        [12, 17],
        [13, 18],
        [14, 19],
        [15, 20],
        [21, 16],
        [16, 22],
        [22, 17],
        [17, 23],
        [23, 18],
        [18, 24],
        [24, 19],
        [19, 25],
        [25, 20],
        [20, 26],
        [21, 27],
        [22, 28],
        [23, 29],
        [24, 30],
        [25, 31],
        [26, 32],
        [27, 33],
        [33, 28],
        [28, 34],
        [34, 29],
        [29, 35],
        [35, 30],
        [30, 36],
        [36, 31],
        [31, 37],
        [37, 32],
        [33, 38],
        [34, 39],
        [35, 40],
        [36, 41],
        [37, 42],
        [38, 43],
        [43, 39],
        [39, 44],
        [44, 40],
        [40, 45],
        [45, 41],
        [41, 46],
        [46, 42],
        [43, 47],
        [44, 48],
        [45, 49],
        [46, 50],
        [47, 51],
        [51, 48],
        [48, 52],
        [52, 49],
        [49, 53],
        [53, 50],
        [50, 53]
      ]
      for (var i = 0; i < connections.length; i++) {
        roads.push(new gameRoad(colleges[connections[i][0]], colleges[connections[i][1]], i));
      }
      this.roads = roads;
      this.player = new gamePlayer();
      this.other_players.push(new gameOtherPlayer('red'));
      this.other_players.push(new gameOtherPlayer('blue'));
      this.other_players.push(new gameOtherPlayer('yellow'));
    }

    // =========================================================================
    // Helper methods
    // =========================================================================
    this.pointDistance = function(a1, a2, b1, b2) {
      return (Math.sqrt((Math.pow(a1 - b1, 2)) + Math.pow(a2 - b2, 2)));
    }
    this.checkTopLeft = function(a1, a2, b1, b2, c1, c2) {
      var m = (b2 - a2) / (b1 - a1);
      var b = a2 - m * a1;
      return (c2 <= (m * c1 + b));
    }
    this.checkTopRight = function(a1, a2, b1, b2, c1, c2) {
      var m = (b2 - a2) / (b1 - a1);
      var b = a2 - m * a1;
      return (c2 <= (m * c1 + b));
    }
    this.checkBottomLeft = function(a1, a2, b1, b2, c1, c2) {
      var m = (b2 - a2) / (b1 - a1);
      var b = a2 - m * a1;
      return (c2 >= (m * c1 + b));
    }
    this.checkBottomRight = function(a1, a2, b1, b2, c1, c2) {
      var m = (b2 - a2) / (b1 - a1);
      var b = a2 - m * a1;
      return (c2 >= (m * c1 + b));
    }
    this.checkLeft = function(x0, x1) {
      return (x1 >= x0);
    }
    this.checkRight = function(x0, x1) {
      return (x1 <= x0);
    }

    this.registerEventHandler = function(event_type, handler) {
      if (this.registered_event_handlers[event_type] == null) {
        this.registered_event_handlers[event_type] = new Array();
      }
      this.registered_event_handlers[event_type].push(handler);
    }
    this.fireEvent = function(e){
      var handlers = this.registered_event_handlers[e.event_type];
      if(handlers != null){
        for(var i = 0; i < handlers.length; i++){
          handlers[i](e);
        }
      }
    }

    // Events
    this.SetupTurnEvent = function(){
      this.event_type = SETTLERS_CONSTANTS.SETUP_TURN_EVENT;
    }
    this.DiceRollEvent = function(){
      this.event_type = SETTLERS_CONSTANTS.DICE_ROLL_EVENT;
    }
    this.RobberEvent = function(){
      this.event_type = SETTLERS_CONSTANTS.ROBBERT_EVENT;
    }
    this.BuyEvent = function(){
      this.event_type = SETTLERS_CONSTANTS.BUY_EVENT;
    }
    this.TradeEvent = function(){
      this.event_type = SETTLERS_CONSTANTS.TRADE_EVENT;
    }
    this.TurnChangeEvent = function(){
      this.event_type = SETTLERS_CONSTANTS.TURN_CHANGE_EVENT;
    }

    this.startGame = function() {
      board = this.gameBoard();
      this.turn_number = 1;
      this.status = SETTLERS_CONSTANTS.REGISTERING_PLAYERS;
    }
  }
