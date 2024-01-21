// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load state from localStorage
const loadState = () => {
  
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadState() || { items: [], Total: 0 },
  reducers: {
    addItems: (state, action) => {
      
      const foundItem=state.items.findIndex(i=>i.id===action.payload.id)
      if(foundItem!=-1)
      {
          state.items[foundItem].freq++;
          state.Total += action.payload.price?action.payload.price / 100:268.5;
      }
      else{
        state.items.push({...action.payload,freq:1});
        state.Total += action.payload.price?action.payload.price / 100:268.5;
      }
      saveState(state);
    },
    removeItems: (state, action) => {

      if(state.Total!=0){
        const foundItem=state.items.findIndex(i=>i.id===action.payload)
        if(foundItem!=-1)
        {
          state.items[foundItem].freq--;
          state.Total -= state.items[foundItem].price ?state.items[foundItem].price / 100:268.5;
          if(state.items[foundItem].freq==0)
          state.items.splice(foundItem, 1);
          saveState(state);
        }
         
      }
  
    },
    clearCart: (state) => {
      state.items.length = 0;
      state.Total = 0;
      saveState(state);
    },
    UpadateCart: (state,action) => {
      state.items =action.payload.items ;
      state.Total = action.payload.Total?action.payload.Total:268.5;
      saveState(state);
    },
    returnTotal: (state) => {
      let val = 0;
      for (const item of state.items) {
        val += item.price / 100*item.freq ;
      }
      state.Total = val;
      saveState(state);
    },
  },
});

export const { addItems, removeItems, clearCart, returnTotal,UpadateCart } = cartSlice.actions;
export default cartSlice.reducer;
