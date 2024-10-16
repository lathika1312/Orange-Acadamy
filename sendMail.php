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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $mobile = htmlspecialchars(trim($_POST['mobile']));

    // Input validation
    if (!empty($name) && filter_var($email, FILTER_VALIDATE_EMAIL) && preg_match('/^[0-9]{10}$/', $mobile)) {
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
            $mail->setFrom('demo.orangeacadamy@gmail.com', 'Book A Demo Request');
            $mail->addAddress('medical.orangeacademy@gmail.com');  // Add user email

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Book A Demo Request from ' . $name;
            $mail->Body    = "New Medical Coding Education Form Submission Received.<br><br>" .
                             "Name: " . $name . "<br>" .
                             "Email: " . $email . "<br>" .
                             "Mobile: " . $mobile . "<br>";

            if ($mail->send()) {
                // Send a success response in JSON
                echo json_encode(['status' => 'success', 'message' => 'Email sent successfully!']);
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
