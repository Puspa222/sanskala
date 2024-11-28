<?php
include "../config/db.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Handle POST request for creating a user without specifying role
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;
    $profile_picture = $_FILES['profile_pic']['name'];
    $location = null;
    if ($profile_picture) {
        $target_dir = "../profile_image/";
        $target_file = $target_dir . basename($_FILES["profile_pic"]["name"]);
        move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $target_file);
        $location = $target_file;
    }

    if ($username && $email && $password) {
        $session_id = createUser($username, $email, $password, $location);
        echo json_encode(['status' => 'success', 'message' => 'User created successfully', 'session_id' => $session_id]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    }
}

function createUser($username, $email, $password, $profile_picture) {
    global $conn;
    $ses1 = hash('sha256', rand(1000, 10000));
    $ses2 = hash('sha256', rand(1000, 10000));
    $session = $ses1 . $ses2;
    $stmt = $conn->prepare("INSERT INTO Users (username, email, password, profile_picture, session_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $username, $email, $password, $profile_picture, $session);
    $stmt->execute();
    $stmt->close();
    return $session;
}
