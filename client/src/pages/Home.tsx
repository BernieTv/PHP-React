import { useEffect, useState } from 'react';

import { Card } from '../components';
import { PRODUCTS_API_URL } from '../utils/constants';

export type TCardsContent = Record<
  'id' | 'sku' | 'name' | 'category' | 'properties',
  string
> & { price: number };

const Home = () => {
  const [allItems, setAllItems] = useState<TCardsContent[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${PRODUCTS_API_URL}/read.php`);

      if (response.ok) {
        const result = await response.json();

        setAllItems(result);
      }
    } catch (err) {
      console.log('error');
      alert(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <section className='max-w-7xl mx-auto'>
      <div className='mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {allItems && allItems?.length > 0 ? (
            <>
              {allItems.map((post) => (
                <Card key={post.id} {...post} />
              ))}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Home;
