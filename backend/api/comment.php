<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include "../config/db.php";

try {
    // Decode JSON data from the frontend
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate input data
    $sessionId = $data['session_id'] ?? '';
    $pid = $data['pid'] ?? null;
    $commentText = $data['comment'] ?? '';

    if (empty($sessionId) || empty($pid) || empty($commentText)) {
        echo json_encode(['message' => 'Session ID, Post ID, and comment are required.']);
        exit;
    }

    // Step 1: Retrieve user ID (uid) based on session_id
    $userQuery = "SELECT * FROM users WHERE session_id = ?";
    $userStmt = $conn->prepare($userQuery);
    $userStmt->bind_param("s", $sessionId); // Use bind_param for prepared statement
    $userStmt->execute();
    $userResult = $userStmt->get_result();

    if ($userResult->num_rows === 0) {
        echo json_encode(['message' => 'Invalid session ID or user not found.']);
        exit;
    }

    $user = $userResult->fetch_assoc();
    $uid = $user['id'];
    $username = $user['username'];

    // Step 2: Insert the comment into the comments table
    $commentQuery = "INSERT INTO comments (pid, uid, username, comment) VALUES (?, ?, ?, ?)";
    $commentStmt = $conn->prepare($commentQuery);
    $commentStmt->bind_param("iiss", $pid, $uid, $username, $commentText); // Bind parameters: pid (int), uid (int), comment (string)

    if ($commentStmt->execute()) {
        echo json_encode(['message' => 'Comment added successfully!']);
    } else {
        echo json_encode(['message' => 'Failed to add comment.']);
    }
} catch (Exception $e) {
    // Handle all exceptions
    echo json_encode(['message' => 'An error occurred: ' . $e->getMessage()]);
}

// Close the database connection
$conn->close();
