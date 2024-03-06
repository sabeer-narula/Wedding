import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Initial application state
const initialState = {
  selectedVendor: null,
  // Add other state properties as needed
};

// Reducer function to handle state updates
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_VENDOR':
      return { ...state, selectedVendor: action.payload };
    // Handle other actions as needed
    default:
      return state;
  }
}

// Create Redux store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
