<?php
// Enable CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Include the database connection
include "../config/db.php";

// SQL query to fetch all posts
$query = "SELECT id, title, username, category, content, featured_images FROM posts";

// Execute the query
$result = mysqli_query($conn, $query);

// Check if any posts are found
if (mysqli_num_rows($result) > 0) {
    // Initialize an array to store posts
    $posts = [];

    // Fetch all posts
    while ($row = mysqli_fetch_assoc($result)) {
        $posts[] = $row;
    }

    // Return the posts as a JSON response
    echo json_encode(['posts' => $posts]);
} else {
    // If no posts are found, return an empty array
    echo json_encode(['posts' => []]);
}

// Close the database connection
mysqli_close($conn);
?>
