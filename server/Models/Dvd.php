<?php

namespace App\Models;

use App\Database\Query;
use App\Models\Product;

class Dvd extends Product
{
    public function __construct($sku, $name, $price)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->category = 'DVD';
        $this->properties = 'Size';
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
        $search = substr($data['properties'], -3);
        $numberPart = str_replace($search, '', $data['properties']);

        if (isset($data['properties']) && is_numeric($numberPart)) {
            return TRUE;
        } else {
            echo 'Please, enter a numeric value for the size.';
            return FALSE;
        }

        echo 'Please, enter the value corresponding to the product type.';
        return FALSE;
    }
}
