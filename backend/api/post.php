<?php
// Enable CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include the database connection
include "../config/db.php";

// Check if session_id is provided from the frontend
$sessionId = $_POST['session_id'] ?? '';

if (empty($sessionId)) {
    echo json_encode(['message' => 'Session ID is required.']);
    exit;
}

// Retrieve user ID from the session ID
$query = "SELECT id, username FROM users WHERE session_id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "s", $sessionId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    $userId = $user['id'];
    $userName = $user['username']; // Fix typo: $userNa -> $userName
} else {
    echo json_encode(['message' => 'Invalid session ID or user not found.']);
    exit;
}

// Retrieve post data from the frontend
$title = $_POST['title'] ?? '';
$category = $_POST['category'] ?? '';
$content = $_POST['content'] ?? '';

// Handle image uploads (if any)
$images = [];
if (isset($_FILES['images'])) {
    $uploadedFiles = $_FILES['images'];
    $uploadDir = '../uploads/';

    foreach ($uploadedFiles['name'] as $key => $imageName) {
        $tmpName = $uploadedFiles['tmp_name'][$key];
        $imageType = mime_content_type($tmpName);

        // Only allow certain image types
        if (in_array($imageType, ['image/jpeg', 'image/png', 'image/gif'])) {
            $fileExtension = pathinfo($imageName, PATHINFO_EXTENSION);
            $newFileName = uniqid() . '.' . $fileExtension;
            $destination = $uploadDir . $newFileName;

            if (move_uploaded_file($tmpName, $destination)) {
                $images[] = $destination;
            }
        }
    }
}

// Convert image paths to JSON (if any)
$featuredImages = !empty($images) ? json_encode($images) : null;

// Prepare the SQL query to insert the post data
$sql = "INSERT INTO posts (user_id, username, title, content, featured_images, category) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "isssss", $userId, $userName, $title, $content, $featuredImages, $category);

// Execute the query
if (mysqli_stmt_execute($stmt)) {
    echo json_encode(['message' => 'success']);
} else {
    echo json_encode(['message' => 'Failed to create post.', 'error' => mysqli_error($conn)]);
}

// Close the database connection
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
