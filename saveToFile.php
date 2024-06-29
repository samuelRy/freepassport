<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer le texte envoyé via POST
    $text = isset($_POST['text']) ? $_POST['text'] : '';

    // Définir le nom du fichier
    $filename = 'static/data.txt';

    // Enregistrer le texte dans le fichier
    if (file_put_contents($filename, $text)) {
        echo "Les données ont été enregistrées avec succès.";
    } else {
        echo "Une erreur s'est produite lors de l'enregistrement des données.";
    }
} else {
    echo "Méthode de requête non supportée.";
}
?>
