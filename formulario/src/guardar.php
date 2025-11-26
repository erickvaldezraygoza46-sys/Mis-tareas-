<?php
include("conexion.php");

$nombre = $_POST['nombre'];
$email = $_POST['email'];

$sql = "INSERT INTO usuarios (nombre, email) VALUES ('$nombre', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "Registro guardado correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
