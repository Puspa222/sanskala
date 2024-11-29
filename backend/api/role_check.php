<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../config/db.php'; // Ensure this file sets up the $conn variable

// Handle POST request for user login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve session_id from JSON POST data
    $data = json_decode(file_get_contents('php://input'), true);
    $session_id = $data['session_id'] ?? null;

    if ($session_id) {
        // Authenticate user and get role
        $role = getUserRole($session_id);

        if ($role) {
            // Return success response with session ID and role
            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful',
                'session_id' => $session_id,
                'role' => $role
            ]);
        } else {
            // Invalid session ID
            echo json_encode(['status' => 'error', 'message' => 'Invalid session ID']);
        }
    } else {
        // Missing session ID
        echo json_encode(['status' => 'error', 'message' => 'Missing session ID']);
    }
}

// Function to get user role based on session ID
function getUserRole($session_id)
{
    global $conn;
    $stmt = $conn->prepare("SELECT role FROM Users WHERE session_id = ?");
    $stmt->bind_param("s", $session_id);
    $stmt->execute();
    $stmt->bind_result($role);
    $stmt->fetch();
    $stmt->close();
    return $role;
}
?>