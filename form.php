<?php
// Concecto mi formulario a travez del nombre con el servidor
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$asunto = $_POST['asunto'];
$mensaje = $_POST['mensaje'];

// Cuerpo del EMAIL
$mensaje = "Este mensaje fue enviado por: ".$nombre.",\r\n";
$mensaje .= "Su email es: ".$email." \r\n";
$mensaje .= "ASUNTO: ".$asunto." \r\n";
$mensaje .= "MENSAJE: ".$_POST['mensaje']." \r\n";
$mensaje .= "Enviado el: ". date('d/m/Y', time());

$destinatario = "se.lopezn@gmail.com";

// Funcion mail de php
mail($destinatario, utf8_decode($asunto), utf8_decode($mensaje), $header);

// Redireccion
header('Location:index.html');
?>