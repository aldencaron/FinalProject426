<?php
    require_once("SettlersOfCarolina-orm.php");

    print_r(Road::getAllJSON());
    echo "<br />";
    print_r(Player::getAllJSON());
    echo "<br />";
    print_r(College::getAllJSON());
    echo "<br />";
    print_r(Tile::getAllJSON());
    echo "<br />";
    print_r(Card::getAllJSON());
    echo "<br />";
    print_r(DiceRoll::getAllJSON());
    echo "<br />";
 ?>