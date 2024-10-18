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
$toEmail = 'your_email@example.com'; 
$subject = 'Demo Class Registration';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capture and sanitize form data
    $email = htmlspecialchars(trim($_POST['email']));
    $countryCode = htmlspecialchars(trim($_POST['countryCode']));
    $phone = htmlspecialchars(trim($_POST['sendto']));

    // Input validation
    if (filter_var($email, FILTER_VALIDATE_EMAIL) && preg_match('/^\+?[0-9]{1,3}?[0-9]{1,14}$/', $countryCode . $phone)) {
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
            $mail->setFrom('demo.orangeacadamy@gmail.com', 'Demo Class Request');
            $mail->addAddress('medical.orangeacademy@gmail.com');  // Add the recipient email

            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = "A new demo class registration has been received.<br><br>" .
                             "Email: " . $email . "<br>" .
                             "Phone: " . $countryCode . $phone . "<br>";

            if ($mail->send()) {
                // Send a success response in JSON
                echo json_encode(['status' => 'success', 'message' => 'Demo class registration sent successfully!']);
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