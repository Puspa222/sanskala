<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include "../config/db.php";

// Decode JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

// Retrieve session_id and pid from frontend
$sessionId = $data['session_id'] ?? '';
$pid = $data['pid'] ?? null;
$commentText = $data['comment'] ?? '';

if (empty($sessionId) || empty($pid) || empty($commentText)) {
    echo json_encode(['message' => 'Session ID, Post ID, and comment are required.']);
    exit;
}

// Step 1: Find the user ID (uid) using the session_id
$userQuery = "SELECT uid FROM users WHERE session_id = ?";
$userStmt = $conn->prepare($userQuery);
$userStmt->bind_param("s", $sessionId);

if (!$userStmt->execute()) {
    echo json_encode(['message' => 'Failed to query user data.']);
    exit;
}

$userResult = $userStmt->get_result();

if ($userResult->num_rows === 0) {
    echo json_encode(['message' => 'Invalid session ID or user not found.']);
    exit;
}

$user = $userResult->fetch_assoc();
$uid = $user['uid'];

// Step 2: Insert the comment into the comments table
$commentQuery = "INSERT INTO comments (pid, uid, comment) VALUES (?, ?, ?)";
$commentStmt = $conn->prepare($commentQuery);
$commentStmt->bind_param("iis", $pid, $uid, $commentText);

if ($commentStmt->execute()) {
    echo json_encode(['message' => 'Comment added successfully!']);
} else {
    echo json_encode(['message' => 'Failed to add comment.']);
}

// Close statements and database connection
$userStmt->close();
$commentStmt->close();
$conn->close();
?>
