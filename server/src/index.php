<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    include('./routes/index.php');

    router(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH));
?>