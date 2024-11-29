<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Your existing PHP code

include "../config/db.php";

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Retrieve comments for a specific post
        if (!isset($_GET['pid'])) {
            echo json_encode(['status' => 'error', 'message' => 'Post ID is required']);
            exit;
        }

        $pid = intval($_GET['pid']);
        $query = "SELECT * FROM comments WHERE pid = ? ORDER BY created_at DESC";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $pid);
        $stmt->execute();
        $result = $stmt->get_result();
      
        $comments = [];
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }

        echo json_encode(['status' => 'success', 'comments' => $comments]);
        exit;
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Add a new comment
        $data = json_decode(file_get_contents("php://input"), true);

        $sessionId = $data['session_id'] ?? '';
        $pid = $data['pid'] ?? null;
        $commentText = $data['comment'] ?? '';

        if (empty($sessionId) || empty($pid) || empty($commentText)) {
            echo json_encode(['status' => 'error', 'message' => 'Session ID, Post ID, and comment are required']);
            exit;
        }

        // Retrieve user based on session_id
        $userQuery = "SELECT * FROM users WHERE session_id = ?";
        $userStmt = $conn->prepare($userQuery);
        $userStmt->bind_param("s", $sessionId);
        $userStmt->execute();
        $userResult = $userStmt->get_result();

        if ($userResult->num_rows === 0) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid session ID or user not found']);
            exit;
        }

        $user = $userResult->fetch_assoc();
        $uid = $user['id'];
        $username = $user['username'];

        // Insert the comment into the comments table
        $commentQuery = "INSERT INTO comments (pid, uid, username, comment) VALUES (?, ?, ?, ?)";
        $commentStmt = $conn->prepare($commentQuery);
        $commentStmt->bind_param("iiss", $pid, $uid, $username, $commentText);

        if ($commentStmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Comment added successfully!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to add comment']);
        }
        exit;
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'An error occurred: ' . $e->getMessage()]);
}

// Close the database connection
$conn->close();
