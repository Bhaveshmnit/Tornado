import { createSlice } from "@reduxjs/toolkit";

const loadFavtState = () => {
    try {
      const serializedState = localStorage.getItem('favtState');
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
  const saveFavtState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('favtState', serializedState);
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  };

const favtRestro=createSlice({
    name: 'favt',
  initialState: loadFavtState() || { myList: [] },
    reducers:{
        addFavt: (state, action) => {
            const existingItem = state.myList.find(item => item.id === action.payload.id);
            if (!existingItem) {
               
                state.myList.push(action.payload)
            }
            saveFavtState(state)
        },
        removeFavt:(state,action)=>{
              
                state.myList.splice(action.payload,1);
                saveFavtState(state)
        },
        UpadateFavt: (state,action) => {
       
          state.myList =action.payload.myList;
          saveFavtState(state);
        },
        clearFavt: (state) => {
         
          state.myList.length = 0;
          saveFavtState(state);
        },
}

})

export const {addFavt,removeFavt,UpadateFavt,clearFavt}=favtRestro.actions
export default favtRestro.reducer