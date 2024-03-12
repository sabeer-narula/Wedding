import { configureStore, createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';


interface Vendor {
  id: number;
  name: string;
  type: string;
  price: number;
}

interface Guest {
  id: number;
  name: string;
  attending: boolean;
  guests: number;
  dinner: string;
  dietaryRestrictions: string;
}

interface AppState {
  selectedVendors: {
    photography?: Vendor;
    venue?: Vendor;
    catering?: Vendor;
  };
  totalSpend: number;
  guests: Guest[];
}

const guestsData = [
    { id: 1, name: 'John Doe', attending: true, guests: 2, dinner: 'steak', dietaryRestrictions: '' },
    { id: 2, name: 'Jane Smith', attending: true, guests: 1, dinner: 'salmon', dietaryRestrictions: 'Gluten-free' },
    { id: 3, name: 'Mike Johnson', attending: false, guests: 0, dinner: '', dietaryRestrictions: '' },
    { id: 4, name: 'Emily Davis', attending: true, guests: 3, dinner: 'vegetarian', dietaryRestrictions: 'Vegan' },
    { id: 5, name: 'Robert Wilson', attending: true, guests: 2, dinner: 'steak', dietaryRestrictions: 'Nut allergy' },
  ];

const initialAppState: AppState = {
  selectedVendors: {},
  totalSpend: 0,
  guests: guestsData,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: initialAppState,
  reducers: {
    setSelectedVendor(state, action: PayloadAction<Vendor>) {
      const vendor = action.payload;
      state.selectedVendors[vendor.type.toLowerCase() as keyof AppState['selectedVendors']] = vendor;
      state.totalSpend = Object.values(state.selectedVendors).reduce((total, vendor) => total + (vendor ? vendor.price : 0), 0);
    },
    setSelectedVendors(state, action: PayloadAction<{ [key: string]: Vendor }>) {
      state.selectedVendors = action.payload;
      state.totalSpend = Object.values(action.payload).reduce((total, vendor) => total + (vendor ? vendor.price : 0), 0);
    },
  },
});

export const { setSelectedVendor, setSelectedVendors } = vendorSlice.actions;

// export const { setSelectedVendor } = vendorSlice.actions;
// export const setSelectedVendors = createAction<{ [key: string]: Vendor }>('vendor/setSelectedVendors');

const guestSlice = createSlice({
    name: 'guest',
    initialState: initialAppState,
    reducers: {
      setGuests(state, action: PayloadAction<Guest[]>) {
        state.guests = action.payload;
      },
      addGuest(state, action: PayloadAction<Guest>) {
        state.guests.push(action.payload);
      },
      // Add more reducers as needed (e.g., updateGuest, removeGuest)
    },
  });
  
  export const { setGuests, addGuest } = guestSlice.actions;

  export const store = configureStore({
    reducer: {
      vendor: vendorSlice.reducer,
      guest: guestSlice.reducer,
    },
  });

  

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;