<?php
// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173"); // Frontend URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  // Allowed HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers

include '../config/db.php'; // Database connection (make sure this file contains your DB connection details)

// If it's a preflight OPTIONS request, send a response and exit
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Read raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Check if the session_id exists in the received data
if (isset($data['session_id'])) {
    $session_id = $data['session_id'];

    // Sanitize session_id for security
    $session_id = mysqli_real_escape_string($conn, $session_id);

    // Query to get user data associated with session_id
    $query = "SELECT * FROM users WHERE session_id = '$session_id'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        // User found, fetch user data
        $user = mysqli_fetch_assoc($result);

        // Prepare the response data
        $response = [
            "status" => "success",
            "user" => [
              
                "name" => $user['username'],
                "email" => $user['email'],
                "profile_pic" => $user['profile_picture'] ?? null, // Use null if profile_pic is not set
            ],
        ];

        // Send response as JSON
        echo json_encode($response);
    } else {
        // No user found for that session_id
        echo json_encode([
            "status" => "error",
            "message" => "User not found for the given session ID",
        ]);
    }
} else {
    // Return error if session_id is missing
    echo json_encode([
        "status" => "error",
        "message" => "Missing session ID",
    ]);
}
?>
