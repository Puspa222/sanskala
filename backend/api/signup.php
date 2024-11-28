<?php


// Set headers for CORS and Content-Type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include "../config/db.php";
// Handle POST request for creating a user
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = $_POST['user'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;
    $name = $_POST['name'] ?? null;
    $profile_picture = $_FILES['profile_pic']['name'] ?? null;
    $location = null;

    // Handle profile picture upload
    if ($profile_picture) {
        $target_dir = "../profile_image/";
        $target_file = $target_dir . basename($profile_picture);
        if (!move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $target_file)) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to upload profile picture']);
            exit;
        }
        $location = substr($target_file, 3);
    }

    // Validate required fields
    if ($username && $email && $password && $name) {
        $session_id = createUser($username, $email, $password, $name, $location);
        if ($session_id) {
            echo json_encode(['status' => 'success', 'message' => 'User created successfully', 'session_id' => $session_id]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error creating user']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    }
}

// Function to create a new user and return session_id
function createUser($username, $email, $hashed_password, $name, $profile_picture) {
    global $conn;

    // Generate secure session ID
    $session = hash('sha256', uniqid(rand(), true));

    try {
        $stmt = $conn->prepare("INSERT INTO Users (username, email, password, name, profile_picture, session_id) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $username, $email, $hashed_password, $name, $profile_picture, $session);
        $stmt->execute();
        $stmt->close();

        return $session; // Return the session ID for the new user
    } catch (Exception $e) {
        error_log("Error creating user: " . $e->getMessage());
        return null;
    }
}
?>
