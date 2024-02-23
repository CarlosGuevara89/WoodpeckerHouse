<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


$captcha = $_POST['g-recaptcha-response'];
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Lcq7XgpAAAAAEIthU4FamDD2fbVHO1w-ynVAEjN&response=" . $captcha);
$responseKeys = json_decode($response, true);

if (!$responseKeys["success"]) {
  echo "Por favor, verifica que no eres un robot.";
} else {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $mensaje = $_POST['mensaje'];
  
    $body = "Nuevo mensaje de contacto recibido:\n\n";
    $body .= "Nombre: $nombre\n";
    $body .= "Email: $email\n";
    $body .= "Mensaje: $mensaje\n";

    $mail = new PHPMailer();

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'carlosalfredoguevarachinchilla@gmail.com'; 
    $mail->Password = 'offfnqffmifxsbjv'; 
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('carlosalfredoguevarachinchilla@gmail.com', 'Woodpecker House');
    $mail->addAddress('cguevarachinchilla@gmail.com');

    $mail->Subject = 'Nuevo mensaje de contacto desde el sitio web Woodpecker House';
    $mail->Body = $body;

    if ($mail->send()) {
      echo "¡El mensaje ha sido enviado con éxito!";
    } else {
      echo "Hubo un error al enviar el correo: " . $mail->ErrorInfo;
    }
}
?>
