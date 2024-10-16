<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Allow CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Include PHPMailer library files
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Configuration
$toEmail = 'your_email@example.com'; // Replace with your email address
$subject = 'Medical Coding Workshop Registration';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capture and sanitize form data
    $firstName = htmlspecialchars(trim($_POST['first_name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));

    // Input validation
    if (!empty($firstName) && !empty($email) && !empty($phone)) {
        // Create an instance of PHPMailer
        $mail = new PHPMailer();

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'demo.orangeacadamy@gmail.com';  // Use environment variables or secure this data
            $mail->Password   = 'cmtwzpsrigsjiubl';         // Use environment variables
            $mail->SMTPSecure = 'ssl';
            $mail->Port       = 465;

            // Recipients
            $mail->setFrom('demo.orangeacadamy@gmail.com', 'Workshop Request');
            $mail->addAddress('medical.orangeacademy@gmail.com');  // Add user email

            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = "A new workshop registration has been received.<br><br>" .
                             "First Name: " . $firstName . "<br>" .
                             "Email: " . $email . "<br>" .
                             "Phone: " . $phone . "<br>";

            if ($mail->send()) {
                // Send a success response in JSON
                echo json_encode(['status' => 'success', 'message' => 'Workshop registration sent successfully!']);
            } else {
                // Send failure response in JSON
                echo json_encode(['status' => 'error', 'message' => 'Email sending failed.']);
            }
        } catch (Exception $e) {
            // Send detailed error in response
            echo json_encode(['status' => 'error', 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input. Please check your details.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>