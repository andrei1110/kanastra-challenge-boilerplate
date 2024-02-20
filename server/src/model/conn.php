<?php
    function connect() {
        $host = getenv("DB_HOST");
        $username = getenv("DB_USER");
        $password = getenv("DB_PASSWORD");
        $db = getenv("DB_DATABASE");
        try {
            $conn = new PDO("mysql:host=$host;dbname=$db", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            die();
        }
    }
    
?>