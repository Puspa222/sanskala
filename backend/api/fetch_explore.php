<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include "../config/db.php";

// Get the posted data
$data = json_decode(file_get_contents("php://input"), true);
$filter = $data['filter'] ?? 'ALL'; // Default to 'ALL' if not provided
$search = $data['search'] ?? '';   // Default to an empty string if not provided

// Prepare the base SQL query
$sql = "SELECT * FROM posts WHERE 1=1";

// Add filter condition if not 'ALL'
if ($filter !== "ALL") {
    $filterEscaped = $conn->real_escape_string($filter);
    $sql .= " AND category = '$filterEscaped'";
}

// Add search condition if not empty
if (!empty($search)) {
    $searchEscaped = $conn->real_escape_string($search);
  //  $sql .= " AND (title LIKE '%$searchEscaped%' OR description LIKE '%$searchEscaped%')";
    $sql .= " AND (title LIKE '%$searchEscaped%' )";
}

// Execute the query
$result = $conn->query($sql);

// Prepare the response
$items = array();
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
        
    }
}

// Return the response
echo json_encode($items);

// Close the connection
$conn->close();
?>
