<?php

date_default_timezone_set('America/New_York');

$conn = new mysqli("classroom.cs.unc.edu",
                   "comp426f16",
                   "CH@ngemenow99Please!comp426f16",
		   "comp426f16db");

$conn->query("drop table if exists Todo");

$conn->query("create table Todo ( " .
               "id int primary key not null auto_increment, " .
	       "title char(200), " .
	       "note text, " .
	       "project char(100), " .
	       "due_date date, " .
	       "priority int, " .
	       "complete boolean)");

$project_names = array("COMP 416", "COMP 426", "Scalable Display", "Telepresence", "Graduate Admissions");
$title_part1 = array("Write", "Consider", "Develop", "Assess", "Delete", "Read");
$title_part2 = array("preliminary", "primary", "secondary", "penultimate", "backup", "final");
$title_part3 = array("report", "proposal", "plan", "manual", "book", "article");
$title_part4 = array("notes", "outline", "index", "table of contents", "references", "footnotes");

for($i=0; $i<50; $i++) {
  $title = $title_part1[rand(0,5)] . " " .
    $title_part2[rand(0,5)] . " " .
    $title_part3[rand(0,5)] . " " .
    $title_part4[rand(0,5)] . ".";
  $project = $project_names[rand(0,4)];
  $complete = 0;
  if (rand(0,99) < 10) {
    $complete = 1;
  }
  $note = "This is a note for the item \"" . $title .
    "\". The rest of this text is" .
    " here just to make it a little longer. I thought about creating a " .
    "note generator, but then got tired.";

  $due_date = null;
  $now = new DateTime();
  $rnd = rand(0,99);
  if ($rnd < 25) {
    $due_date = $now;
    $due_date->sub(new DateInterval("P" . rand(1,10) . "D"));
  } else if ($rnd < 75) {
    $due_date = $now;
    $due_date->add(new DateInterval("P" . rand(1,200) . "D"));
  }
  $priority = rand(1,10);

  if ($due_date == null) {
    $due_date = "null";
  } else {
    $due_date = "'" . $due_date->format('Y-m-d') . "'";
  }

  $conn->query("insert into Todo values (0, " .
	       "'" . $conn->real_escape_string($title) . "', " .
	       "'" . $conn->real_escape_string($note) . "', " .
	       "'" . $conn->real_escape_string($project) . "', " .
	       $due_date . ", " .
	       $priority . ", " .
	       $complete . ")");
}

?>
<html>
 <head>
   <title>Todo List Example Setup</title>
 <head>
 <body>
   <h1>Database Setup Complete</h1>
 </body>
</html>
