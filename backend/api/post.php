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
$query = "SELECT id FROM users WHERE session_id = '$sessionId'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    $userId = $user['id'];
} else {
    echo json_encode(['message' => 'Invalid session ID or user not found.']);
    exit;
}

// Retrieve post data from the frontend
$title = $_POST['title'] ?? '';
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

// Debug: Print the SQL query to check the data
$sql = "INSERT INTO posts (user_id, title, content, featured_images) 
        VALUES ('$userId', '$title', '$content', '$featuredImages')";
echo $sql;  // Debugging SQL query

if (mysqli_query($conn, $sql)) {
    echo json_encode(['message' => 'Post created successfully!']);
} else {
    echo json_encode(['message' => 'Failed to create post.', 'error' => mysqli_error($conn)]);
}

// Close the database connection
mysqli_close($conn);
?>
