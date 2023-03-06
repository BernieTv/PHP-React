<?php

namespace App\Models;

use App\Models\Product;

use App\Database\Query;

class Furniture extends Product
{
    public function __construct($sku, $name, $price)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->category = 'Furniture';
        $this->properties = 'Dimension';
        $this->created = date('Y-m-d H:i:s');
    }

    public function create($data)
    {
        if (!$this->ValidateProductData()) {
            return die();
        } else if (!$this->validateAttrValue($data)) {
            return die();
        }

        $this->setAttrValue($data);
        $query = new Query();
        $query->create($this->getData());
    }

    protected function setAttrValue($data)
    {
        $this->properties = $data['properties'];
    }

    protected function validateAttrValue($data)
    {
        $numberPart = str_replace('x', '', $data['properties']);

        if (!isset($data['properties']) && is_numeric($numberPart)) {
            echo 'Please, enter numeric values for category properties';
            return false;
        }

        return true;
    }
}
