import { useContext, useRef } from 'react';
import { Link, Routes, Route, useMatch } from 'react-router-dom';
import { ItemsContext } from './context/ContextProvider';

import { AddItem, Home } from './pages';
import { PRODUCTS_API_URL } from './utils/constants';

const App = () => {
  const match = useMatch('/add-product');
  const formRef = useRef<any>();

  const { items } = useContext(ItemsContext);

  const massDelete = async () => {
    try {
      await fetch(`${PRODUCTS_API_URL}/delete.php`, {
        method: 'POST',
        body: JSON.stringify(items),
      });
    } catch (error: any) {
      console.error(error.message);
    }

    items.length > 0 && location.reload();
  };

  return (
    <>
      <header className='w-full'>
        <nav className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
          <Link to='/'>
            <h1 className='text-3xl text-[#4351a0]  hover:text-[#3d7b94]'>
              Product {match?.pathname === '/add-product' ? 'Add' : 'List'}
            </h1>
          </Link>

          {match?.pathname === '/add-product' ? (
            <div className='flex justify-between items-center gap-x-3'>
              <button
                className='nav__button'
                onClick={() => formRef?.current?.handleSubmit()}>
                Save
              </button>

              <Link to='/' className='nav__button'>
                Cancel
              </Link>
            </div>
          ) : (
            <div className='flex justify-between items-center gap-x-3'>
              <Link to='/add-product' className='nav__button'>
                ADD
              </Link>

              <button
                type='button'
                className='nav__button'
                onClick={massDelete}>
                MASS DELETE
              </button>
            </div>
          )}
        </nav>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-product' element={<AddItem ref={formRef} />} />
        </Routes>
      </main>

      <footer className='w-full flex items-center justify-center'>
        <div className='w-full mx-auto py-5 text-center border-t border-b-[#e6ebf4]'>
          Scandiweb Test assignment
        </div>
      </footer>
    </>
  );
};

export default App;
