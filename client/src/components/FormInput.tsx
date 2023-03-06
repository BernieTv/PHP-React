import { useState } from 'react';

import multiplyLogo from '/assets/multiply.svg';
import {
  checkNumber,
  checkProductName,
  checkSku,
  toCapitalized,
} from '../utils';
import { IFormFields } from './FormFields';
import FormSelectInput from './FormSelectInput';

interface IFormInputProps {
  name: string;
  value: string | number;
  errorMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setFormFields: React.Dispatch<React.SetStateAction<IFormFields>>;
  formFields: IFormFields;
  selectInput?: boolean;
}

const FormInput: React.FC<IFormInputProps> = ({
  name,
  value,
  errorMessage,
  setErrorMessage,
  setFormFields,
  formFields,
  selectInput,
}) => {
  const [showCloseIcon, setShowCloseIcon] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });

    if (
      ['price', 'size', 'height', 'width', 'length', 'weight'].includes(name) &&
      Number(value) < 0
    ) {
      setFormFields({ ...formFields, [name]: 0 });
    }

    if (value === '') {
      setShowCloseIcon(false);
    } else {
      setShowCloseIcon(true);
    }

    switch (name) {
      case 'sku':
        checkSku(value, setErrorMessage);
        break;
      case 'name':
        checkProductName(value, setErrorMessage);
        break;
      case 'price':
      case 'size':
      case 'weight':
      case 'height':
      case 'width':
      case 'length':
        checkNumber(value, setErrorMessage, name);
        break;
    }
  };

  const handleClear = (name: string) => {
    setFormFields({ ...formFields, [name]: '' });

    switch (name) {
      case 'sku':
        checkSku('', setErrorMessage);
        break;
      case 'name':
        checkProductName('', setErrorMessage);
        break;
      case 'price':
      case 'size':
      case 'weight':
      case 'height':
      case 'width':
      case 'length':
        checkNumber('0', setErrorMessage, name);
        break;
    }
  };

  const content = selectInput ? (
    <FormSelectInput
      value={value}
      errorMessage={errorMessage}
      handleChange={handleChange}
      handleClear={handleClear}
      name={name}
      showCloseIcon={showCloseIcon}
    />
  ) : (
    <div className='input-box'>
      <label htmlFor={name}>{toCapitalized(name)} must be unique</label>

      {value && showCloseIcon ? (
        <div className='closeSvg' onClick={() => handleClear(name)}>
          <img src={multiplyLogo} alt='Close' />
        </div>
      ) : null}

      <input
        id={name}
        className={`${errorMessage && errorMessage.length > 0 ? 'error' : ''} ${
          errorMessage === '' ? 'success' : ''
        }`}
        onChange={handleChange}
        type='text'
        placeholder={`${toCapitalized(name)}`}
        required
        name={name}
        value={value}
        autoComplete={`${name === 'sku' ? 'off' : 'on'}`}
      />

      <small>
        {errorMessage === '' ? (
          <span>{toCapitalized(name)} is valid.</span>
        ) : (
          errorMessage
        )}
      </small>
    </div>
  );

  return content;
};

export default FormInput;
