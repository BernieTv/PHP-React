import React, { SetStateAction, useReducer, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ItemsContext = React.createContext<{
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  setAllSku: (value: SetStateAction<string[]>) => void;
  allSku: string[];
}>({
  items: [],
  addItem: (_: string) => {},
  removeItem: (_: string) => {},
  setAllSku: () => [],
  allSku: [],
});

const defaultItemsState: {
  items: string[];
} = {
  items: [],
};

const ItemsReducer = (
  state: { items: string[] },
  action: { id: string; type: string }
) => {
  if (action.type === 'ADD') {
    const updatedState = state.items.concat(action.id);

    return {
      items: updatedState,
    };
  }

  if (action.type === 'REMOVE') {
    const updatedState = state.items.filter((id: string) => id !== action.id);

    return {
      items: updatedState,
    };
  }

  return defaultItemsState;
};

const ItemsProvider: React.FC<Props> = (props) => {
  const [itemsState, dispatchItemsAction] = useReducer(
    ItemsReducer,
    defaultItemsState
  );
  const [allSku, setAllSku] = useState<string[]>([]);

  const addItemToItemsHandler = (id: string) => {
    dispatchItemsAction({ type: 'ADD', id });
  };

  const removeItemFromItemsHandler = (id: string) => {
    dispatchItemsAction({ type: 'REMOVE', id });
  };

  const itemsContext = {
    items: itemsState.items,
    addItem: addItemToItemsHandler,
    removeItem: removeItemFromItemsHandler,
    setAllSku,
    allSku,
  };

  return (
    <ItemsContext.Provider value={itemsContext}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
