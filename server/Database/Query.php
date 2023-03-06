<?php

namespace App\Database;

use App\Database\Connection;
use PDOException;

class Query extends Connection
{
    private $db_table = "product";

    public function all()
    {
        try {
            $sql = 'SELECT * FROM `product`
            LEFT JOIN product_attribute ON product.id = product_attribute.product_id
            UNION
            SELECT * FROM `product`
            RIGHT JOIN product_attribute ON product.id = product_attribute.product_id
            ORDER BY created DESC;';

            $query = $this->getDb()->prepare($sql);
            $query->execute();

            return $query->fetchAll();
        } catch (PDOException $exception) {
            echo "Server error: " . $exception->getMessage();
        }
    }

    public function productExist($sku)
    {
        try {
            $sql = "SELECT * FROM " . $this->db_table . " WHERE sku = ?;";
            $query = $this->getDb()->prepare($sql);
            $query->execute([$sku]);

            return empty($query->fetch()) ? FALSE : TRUE;
        } catch (PDOException $exception) {
            echo "Server error: " . $exception->getMessage();
        }
    }

    public function create($data)
    {
        try {
            $sql = "INSERT INTO " . $this->db_table . " (sku , name , price , created) VALUES ( ? , ? , ? , ?);";
            $query = $this->getDb()->prepare($sql);

            if (!$query->execute($data['product'])) {
                return exit('Error');
            }

            $productId = $this->getDb()->lastInsertId();
            array_unshift($data['attribute'], $productId);
            $sql = 'INSERT INTO `product_attribute` ( product_id , category , properties ) VALUES ( ? , ? , ?);';
            $query = $this->getDb()->prepare($sql);
            $query->execute($data['attribute']);

            echo json_encode('Product created successfully!');
        } catch (PDOException $exception) {
            echo "Server error: " . $exception->getMessage();
        }
    }

    public function delete($id)
    {
        try {
            $sql = "DELETE FROM " . $this->db_table . " WHERE id = ? ;";
            $query = $this->getDb()->prepare($sql);

            return $query->execute([$id]);
        } catch (PDOException $exception) {
            echo "Server error: " . $exception->getMessage();
        }
    }
}
