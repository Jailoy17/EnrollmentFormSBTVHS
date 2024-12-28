<?php
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $text = isset($_POST['text']) ? strip_tags(trim($_POST['text'])) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

    if (empty($text)) {
        $errors[] = 'name is empty';
    }

    if (empty($email)) {
        $errors[] = 'Email is empty';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is invalid';
    }

    if (empty($message)) {
        $errors[] = 'Message is empty';
    }

    if (empty($errors)) {

        $recipient = "udtohan.samuel_angelo@hnu.edu.ph";

        $headers = "From: $name <$email>";

        if (mail($recipient, $message, $headers)) {
            echo "Email sent successfully!";
        } else {
            echo "Failed to send email. Please try again later.";
        }
    } else {

        echo "The form contains the following errors:<br>";
        foreach ($errors as $error) {
            echo "- $error<br>";
        }
    }
} else {

    header("HTTP/1.1 403 Forbidden");
    echo "You are not allowed to access this page.";
}
?>