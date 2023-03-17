import { memo, useContext } from 'react';

import { ItemsContext } from '../context/ContextProvider';
import { TCardsContent } from '../pages/Home';

const Card: React.FC<TCardsContent> = memo(
  ({ name, price, sku, properties, id, category }) => {
    const { addItem, removeItem, items } = useContext(ItemsContext);

    const handleCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        addItem(id);
      } else {
        removeItem(id);
      }
    };

    return (
      <div className='rounded-xl shadow-card hover:shadow-cardhover card w-full h-full p-6 relative'>
        <div className='absolute top-2 left-2'>
          <label className='form-check-label'>
            <input
              type='checkbox'
              className='delete-checkbox w-4 h-4'
              name='delete-checkbox'
              checked={items.includes(id)}
              onChange={handleCheckboxes}
            />
          </label>
        </div>
        <div className='flex flex-col justify-between items-center gap-y-4 h-[100%] '>
          <p className='text-purple-500 text-3xl'>{sku}</p>
          <p className='text-purple-500 text-1xl font-bold'>{name}</p>
          <p className='text-purple-500 text-1xl'>
            {Number(price).toFixed(2) + ' $'}
          </p>
          <p className='text-purple-500 text-1xl'>
            {category}: {properties}
          </p>
        </div>
      </div>
    );
  }
);

export default Card;
