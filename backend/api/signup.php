<?php
// Include DB connection
include '../config/db.php';

// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check if required fields are present
if (!isset($_POST['fullname'], $_POST['email'], $_POST['username'], $_POST['password']) || !isset($_FILES['profilePicture'])) {
    echo json_encode(['message' => 'All fields are required.']);
    exit;
}

// Retrieve user data from the form
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password']; // Plain password (to be hashed)

if (empty($fullname) || empty($email) || empty($username) || empty($password)) {
    echo json_encode(['message' => 'All fields are required.']);
    exit;
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Handle profile picture upload
$profilePicture = $_FILES['profilePicture'];
$profilePictureName = $profilePicture['name'];
$profilePictureTmpName = $profilePicture['tmp_name'];
$profilePictureSize = $profilePicture['size'];
$profilePictureError = $profilePicture['error'];

// Check for file upload errors
if ($profilePictureError === 0) {
    // Check if file is an image
    $fileExtension = pathinfo($profilePictureName, PATHINFO_EXTENSION);
    $validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!in_array(strtolower($fileExtension), $validExtensions)) {
        echo json_encode(['message' => 'Invalid file format. Only JPG, JPEG, PNG, and GIF are allowed.']);
        exit;
    }

    // Limit file size (e.g., 5MB max)
    $maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
    if ($profilePictureSize > $maxFileSize) {
        echo json_encode(['message' => 'File size exceeds the 5MB limit.']);
        exit;
    }

    // Generate a new filename and save the file
    $fileNameNew = uniqid('', true) . "." . $fileExtension;
    $fileDestination = '../uploads/profile_pictures/' . $fileNameNew; // Store in uploads/profile_pictures directory

    // Move the uploaded file to the server
    if (move_uploaded_file($profilePictureTmpName, $fileDestination)) {
        // Store the file path in the database
        $profilePictureUrl = 'uploads/profile_pictures/' . $fileNameNew; // Store relative path in DB
    } else {
        echo json_encode(['message' => 'Failed to upload profile picture.']);
        exit;
    }
} else {
    echo json_encode(['message' => 'Error with file upload.']);
    exit;
}

// Generate a custom session ID using a random string (using a secure method)
$sessionId = bin2hex(random_bytes(16)); // 16 bytes for a 32-character hex string

// Insert the new user into the database with the generated session ID
$stmt = $conn->prepare("INSERT INTO users (fullname, email, username, password, profile_pic, session_id) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $fullname, $email, $username, $hashedPassword, $profilePictureUrl, $sessionId);

if ($stmt->execute()) {
    // Return success response with session_id
    echo json_encode(['message' => 'Signup successful!', 'session_id' => $sessionId]);
} else {
    echo json_encode(['message' => 'Signup failed. Please try again.']);
}

$stmt->close();
$conn->close();
?>
