<?php
require("SettlersOfCarolina-orm.php");
//NUMBER ONE: Get Multiple People in One Game

//we need function to update/get cards
//to get/update roads
//To get/update colleges
//To find/set robber
//Get and update Player Information.

$conn = new mysqli("classroom.cs.unc.edu", "naeimz", "naeim410", "naeimzdb");

// Delete previous table values
$conn->query("DELETE FROM Cards");

// Test data
$card1 = Card::create("PlayerID", "Ram", "Ramen", "Brick", "Basketball", "Book",
"Knight", "OldWell", "ThePit", "DavisLibrary", "Sitterson", "BellTower", "Roads",
"Volunteer", "Monopoly");

echo "<br /> " . $card1->getPlayerID();
echo "<br />" . $card1->getRam();
echo "<br /> " . $card1->getRamen();
echo "<br /> " . $card1->getBrick();
echo "<br /> " . $card1->getBasketball();
echo "<br /> " . $card1->getBook();
echo "<br /> " . $card1->getKnight();
echo "<br /> " . $card1->getOldWell();
echo "<br /> " . $card1->getThePit();
echo "<br /> " . $card1->getDavisLibrary();
echo "<br /> " . $card1->getSitterson();
echo "<br /> " . $card1->getBellTower();
echo "<br /> " . $card1->getRoads();
echo "<br /> " . $card1->getVolunteer();
echo "<br /> " . $card1->getMonopoly();

 ?>
