const isRequired = (value: string) => (value === '' ? false : true);

function isValid(value: string) {
  const format = /[!@#$%^&*()+\=[\]{};':"\\|,.<>/?]+/;

  return !format.test(value);
}

const isBetween = (length: number, min: number, max: number) =>
  length < min || length > max ? false : true;

export const checkProductName = (
  productName: string,
  setProductNameErrorMessage: (message: string | null) => void
) => {
  const min = 2,
    max = 50;
  const trimmedProductName = productName.trim();

  if (!isRequired(trimmedProductName)) {
    setProductNameErrorMessage(
      'Product name cannot be blank. Please, submit required data'
    );
  } else if (!isBetween(trimmedProductName.length, min, max)) {
    setProductNameErrorMessage(
      `Product name must be between ${min} and ${max} characters.`
    );
  } else if (!isValid(trimmedProductName)) {
    setProductNameErrorMessage(
      `Product name should not consist of this special characters in (!@#$%^&*). Please, provide the data of indicated type`
    );
  } else {
    setProductNameErrorMessage('');
  }
};

export const checkSku = async (
  sku: string,
  setSkuErrorMessage: (message: string | null) => void
) => {
  const trimmedSkuValue = sku.trim();

  if (!isRequired(trimmedSkuValue)) {
    setSkuErrorMessage('SKU cannot be blank. Please, submit required data');
  } else if (!isValid(trimmedSkuValue)) {
    setSkuErrorMessage(
      `SKU should not consist of this special characters in (!@#$%^&*). Please, provide the data of indicated type`
    );
  } else {
    setSkuErrorMessage('');
  }
};

export const toCapitalized = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const checkNumber = (
  numberToCheck: string,
  setErrorMessage: (message: string | null) => void,
  name: string
) => {
  const trimmedNumberToCheck = numberToCheck.trim();

  if (!isRequired(trimmedNumberToCheck)) {
    setErrorMessage(
      `${toCapitalized(name)} cannot be blank. Please, submit required data`
    );
  } else if (!Number(numberToCheck)) {
    setErrorMessage(
      `${toCapitalized(
        name
      )} should be positive number. Please, submit required data`
    );
  } else if (Number(numberToCheck) < 0) {
    setErrorMessage(`${toCapitalized(name)} should be more than zero`);
  } else {
    setErrorMessage('');
  }
};
