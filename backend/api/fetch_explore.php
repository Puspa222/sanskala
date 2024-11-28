<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include "../config/db.php";


// Get the posted data
$data = json_decode(file_get_contents("php://input"), true);
$filter = $data['filter'];
$search = $data['search'];

// Prepare the SQL query
$sql = "SELECT * FROM posts WHERE 1=1";

if ($filter !== "ALL") {
    $sql .= " AND category = '" . $conn->real_escape_string($filter) . "'";
}

if (!empty($search)) {
    $sql .= " AND (title LIKE '%" . $conn->real_escape_string($search) . "%' OR description LIKE '%" . $conn->real_escape_string($search) . "%')";
}

$result = $conn->query($sql);

$items = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
}

echo json_encode($items);

$conn->close();
?>