<?php
// Verificar reCAPTCHA
$captcha = $_POST['g-recaptcha-response'];
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=YOUR_SECRET_KEY&response=" . $captcha);
$responseKeys = json_decode($response, true);

// Si el CAPTCHA no se verifica, muestra un error
if (!$responseKeys["success"]) {
  echo "Por favor, verifica que no eres un robot.";
} else {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $mensaje = $_POST['mensaje'];
  
    $para = "carlosalfredoguevarachinchilla@gmail.com"; 
    $asunto = "Nuevo mensaje de contacto de tu sitio web";
    $mensajeCorreo = "Nombre: $nombre\n";
    $mensajeCorreo .= "Correo electrónico: $email\n\n";
    $mensajeCorreo .= "Mensaje:\n$mensaje";
  
    // Envío del correo electrónico
    if (mail($para, $asunto, $mensajeCorreo)) {
      echo "¡El mensaje ha sido enviado con éxito!";
    } else {
      echo "Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.";
    }
}
?>
