import { forwardRef } from 'react';
import { FormFields } from '../components';

const AddItem = forwardRef((_, ref) => {
  return (
    <>
      <FormFields ref={ref} />
    </>
  );
});

export default AddItem;
