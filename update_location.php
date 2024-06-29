<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data) {
        $data['timestamp'] = date('Y-m-d H:i:s');
        $locationData = json_encode($data) . PHP_EOL;
        file_put_contents('static/location_data.txt', $locationData, FILE_APPEND);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>
