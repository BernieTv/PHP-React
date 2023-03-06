<?php

use App\Controllers\MyController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../vendor/autoload.php';

$controller = new MyController('READ');
$controller->req();
