import { toCapitalized } from '../utils';
import multiplyLogo from '/assets/multiply.svg';

interface IFormSelectInput {
  name: string;
  value: string | number;
  showCloseIcon: boolean;
  handleClear: (value: string) => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errorMessage: string | null;
}

const FormSelectInput: React.FC<IFormSelectInput> = ({
  name,
  value,
  showCloseIcon,
  handleClear,
  handleChange,
  errorMessage,
}) => {
  return (
    <>
      {['weight', 'size'].includes(name) && <p>Please, provide {name}.</p>}

      <div className='input-box' title={`Please, provide ${name}`}>
        <label htmlFor={name}>{`${toCapitalized(name)} ${
          name === 'size' ? 'MB' : name === 'weight' ? 'KG' : 'CM'
        }`}</label>

        {value && showCloseIcon ? (
          <div className='closeSvg' onClick={() => handleClear(name)}>
            <img src={multiplyLogo} alt='Close' />
          </div>
        ) : null}

        <input
          id={name}
          className={`${
            errorMessage && errorMessage.length > 0 ? 'error' : ''
          } ${errorMessage === '' ? 'success' : ''}`}
          onChange={handleChange}
          type='text'
          placeholder={toCapitalized(name)}
          required
          name={name}
          value={value}
        />

        <small>{errorMessage}</small>
      </div>
    </>
  );
};

export default FormSelectInput;
