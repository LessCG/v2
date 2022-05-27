<?php
header('Content-type: application/json');
$Arr = file_get_contents("data/data.json");
echo json_encode($Arr, true);
?>