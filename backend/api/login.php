<?php
include "../config/db.php"; // Include the database connection

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle POST request for user login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve email and password from POST data
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;

    if ($email && $password) {
        // Validate user credentials
        $session_id = authenticateUser($email, $password);

        if ($session_id) {
          

            // Return success response with session ID
            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful',
                'session_id' => $session_id
            ]);
        } else {
            // Invalid credentials
            echo json_encode(['status' => 'error', 'message' => $session_id]);
        }
    } else {
        // Missing email or password
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    }
}

// Function to authenticate user based on email and password
function authenticateUser($email, $password)
{
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM Users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && $password == $user['password']) {
        // Password matched
      

        return $user['session_id'];
    }
   

    return null; // Invalid credentials
}


?>
