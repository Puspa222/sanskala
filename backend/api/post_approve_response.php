<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include "../config/db.php";

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);
$postId = $data['postId'];
$status = $data['status'];

if($status="approved"){
// Update the post status
$sql = "UPDATE posts SET status = `Yes` WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $postId);

if ($stmt->execute()) {
    echo json_encode(array("status" => "success", "message" => "Post status updated successfully"));
} else {
    echo json_encode(array("status" => "error", "message" => "Error updating post status: " . $stmt->error));
}

}
else if($status="rejected"){
// Update the post status

$sql = "DELETE FROM posts WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $postId);

if ($stmt->execute()) {
    echo json_encode(array("status" => "success", "message" => "Post deleted successfully"));
} else {
    echo json_encode(array("status" => "error", "message" => "Error deleting post: " . $stmt->error));
}


}
$stmt->close();
$conn->close();
?>