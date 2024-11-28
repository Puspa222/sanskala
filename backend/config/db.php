<?php

$host="localhost";
$user="root";
$password="";
$db="sanskala";
$conn = mysqli_connect($host,$user,$password,$db);

if(!$conn){
    die("Error in connection" . mysqli_connect_error());
}

