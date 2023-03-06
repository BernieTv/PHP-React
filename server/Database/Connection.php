<?php

namespace App\Database;

use \PDO;
use PDOException;

class Connection
{
    private static $conn;
    private $host = "localhost";
    private $database_name = "scandiweb";
    private $username = "root";
    private $password = "root";

    private function setDb()
    {
        try {
            self::$conn = null;
            self::$conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
            self::$conn->exec("set names utf8");
            self::$conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            echo "Database could not be connected: " . $exception->getMessage();
        }
    }

    protected function getDb()
    {
        if (self::$conn == null) {
            $this->setDb();
        }

        return self::$conn;
    }
}
