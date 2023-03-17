import { forwardRef, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkSku, checkProductName, checkNumber } from '../utils';
import { PRODUCTS_API_URL } from '../utils/constants';
import FormInput from './FormInput';

import './FormInput.scss';

export type IFormFields = Record<
  'sku' | 'name' | 'price' | 'size' | 'weight' | 'height' | 'width' | 'length',
  string
>;

const defaultFormFields: IFormFields = {
  sku: '',
  name: '',
  price: '',
  size: '',
  weight: '',
  height: '',
  width: '',
  length: '',
};

const categories = ['DVD', 'Book', 'Furniture'];

const FormFields = forwardRef((_, ref) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [skuErrorMessage, setSkuErrorMessage] = useState<string | null>(null);
  const [productNameErrorMessage, setProductNameErrorMessage] = useState<
    string | null
  >(null);
  const [priceErrorMessage, setPriceErrorMessage] = useState<string | null>(
    null
  );
  const [sizeErrorMessage, setSizeErrorMessage] = useState<string | null>(null);
  const [weightErrorMessage, setWeightErrorMessage] = useState<string | null>(
    null
  );
  const [heightErrorMessage, setHeightErrorMessage] = useState<string | null>(
    null
  );
  const [widthErrorMessage, setWidthErrorMessage] = useState<string | null>(
    null
  );
  const [lengthErrorMessage, setLengthErrorMessage] = useState<string | null>(
    null
  );
  const [category, setCategory] = useState<string>('');
  const navigate = useNavigate();

  const { name, sku, price, size, weight, height, width, length } = formFields;

  const match = category.toLowerCase();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setCategory('');
  };

  const resetErrorMessages = () => {
    setSkuErrorMessage(null);
    setProductNameErrorMessage(null);
    setPriceErrorMessage(null);
    setSizeErrorMessage(null);
    setWeightErrorMessage(null);
    setHeightErrorMessage(null);
    setWidthErrorMessage(null);
    setLengthErrorMessage(null);
  };

  const checkFormValidity = () => {
    Object.values(formFields).forEach((value, idx) => {
      if (!Boolean(value)) {
        if (idx === 0) return checkSku(value, setSkuErrorMessage);
        if (idx === 1)
          return checkProductName(value, setProductNameErrorMessage);
        if (idx === 2) return checkNumber(value, setPriceErrorMessage, 'price');
        if (idx === 3) return checkNumber(value, setSizeErrorMessage, 'size');
        if (idx === 4)
          return checkNumber(value, setWeightErrorMessage, 'weight');
        if (idx === 5)
          return checkNumber(value, setHeightErrorMessage, 'height');
        if (idx === 6) return checkNumber(value, setWidthErrorMessage, 'width');
        if (idx === 7)
          return checkNumber(value, setLengthErrorMessage, 'length');
      }
    });
  };

  useImperativeHandle(ref, () => ({
    async handleSubmit() {
      const isInputsValid: any = Object.values(formFields).slice(0, 3);
      if (match === 'dvd') isInputsValid.push(formFields.size);
      if (match === 'book') isInputsValid.push(formFields.weight);
      if (match === 'furniture')
        isInputsValid.push(
          formFields.height,
          formFields.width,
          formFields.length
        );
      if (!match) isInputsValid.push(null);

      checkFormValidity();

      if (
        isInputsValid.every((value: string) => Boolean(value)) &&
        !skuErrorMessage
      ) {
        try {
          const dimensions = `${formFields.height}x${formFields.width}x${formFields.length}`;
          const weightDisplay = `${weight}KG`;
          const sizeDisplay = `${size} MB`;
          const properties =
            match === 'dvd'
              ? sizeDisplay
              : match === 'book'
              ? weightDisplay
              : match === 'furniture'
              ? dimensions
              : null;
          const dataToSend = JSON.stringify({
            sku,
            price: Number(price),
            name,
            category,
            properties,
          });

          const data = await fetch(`${PRODUCTS_API_URL}/create.php`, {
            method: 'POST',
            body: dataToSend,
          });

          const response = await data.json();

          if (response === 'SKU not available') {
            setSkuErrorMessage('SKU is already taken!');
            throw new Error('SKU is already taken!');
          } else if (response === 'Product created successfully!') {
            navigate('/');
          } else {
            throw new Error('Server Error');
          }
        } catch (error: any) {
          alert(error.message);
        } finally {
          if (skuErrorMessage) {
            resetFormFields();
            resetErrorMessages();
          }
        }
      }
    },
  }));

  return (
    <form className='form' id='product_form'>
      <FormInput
        name='sku'
        errorMessage={skuErrorMessage}
        setErrorMessage={setSkuErrorMessage}
        value={sku}
        formFields={formFields}
        setFormFields={setFormFields}
      />

      <FormInput
        name='name'
        errorMessage={productNameErrorMessage}
        setErrorMessage={setProductNameErrorMessage}
        value={name}
        formFields={formFields}
        setFormFields={setFormFields}
      />

      <FormInput
        name='price'
        errorMessage={priceErrorMessage}
        setErrorMessage={setPriceErrorMessage}
        value={price}
        formFields={formFields}
        setFormFields={setFormFields}
      />

      <select
        id='productType'
        onChange={(e) => setCategory(e.target.value)}
        className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer w-full'
        value={category}>
        <option value={''} className='select-options'>
          Type Switcher
        </option>

        {categories.map((name) => (
          <option key={name} className='select-options' value={name}>
            {name}
          </option>
        ))}
      </select>

      {match === 'dvd' ? (
        <FormInput
          name='size'
          errorMessage={sizeErrorMessage}
          setErrorMessage={setSizeErrorMessage}
          value={size}
          formFields={formFields}
          setFormFields={setFormFields}
          selectInput
        />
      ) : match === 'book' ? (
        <FormInput
          name='weight'
          errorMessage={weightErrorMessage}
          setErrorMessage={setWeightErrorMessage}
          value={weight}
          formFields={formFields}
          setFormFields={setFormFields}
          selectInput
        />
      ) : match === 'furniture' ? (
        <>
          <p>Please, provide dimensions in centimeters.</p>

          <FormInput
            name='height'
            errorMessage={heightErrorMessage}
            setErrorMessage={setHeightErrorMessage}
            value={height}
            formFields={formFields}
            setFormFields={setFormFields}
            selectInput
          />

          <FormInput
            name='width'
            errorMessage={widthErrorMessage}
            setErrorMessage={setWidthErrorMessage}
            value={width}
            formFields={formFields}
            setFormFields={setFormFields}
            selectInput
          />

          <FormInput
            name='length'
            errorMessage={lengthErrorMessage}
            setErrorMessage={setLengthErrorMessage}
            value={length}
            formFields={formFields}
            setFormFields={setFormFields}
            selectInput
          />
        </>
      ) : null}
    </form>
  );
});

export default FormFields;
