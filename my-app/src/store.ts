import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    { id: 6, name: 'Sarah Thompson', attending: true, guests: 1, dinner: 'salmon', dietaryRestrictions: '' },
    { id: 7, name: 'David Lee', attending: true, guests: 2, dinner: 'vegetarian', dietaryRestrictions: '' },
    { id: 8, name: 'Jessica Brown', attending: false, guests: 0, dinner: '', dietaryRestrictions: '' },
    { id: 9, name: 'Daniel Taylor', attending: true, guests: 2, dinner: 'steak', dietaryRestrictions: '' },
    { id: 10, name: 'Olivia Anderson', attending: true, guests: 1, dinner: 'salmon', dietaryRestrictions: '' },
    { id: 11, name: 'James Martinez', attending: true, guests: 3, dinner: 'steak', dietaryRestrictions: '' },
    { id: 12, name: 'Sophia Hernandez', attending: true, guests: 2, dinner: 'vegetarian', dietaryRestrictions: 'Dairy-free' },
    { id: 13, name: 'William Moore', attending: true, guests: 1, dinner: 'steak', dietaryRestrictions: '' },
    { id: 14, name: 'Ava Jackson', attending: false, guests: 0, dinner: '', dietaryRestrictions: '' },
    { id: 15, name: 'Benjamin Martin', attending: true, guests: 2, dinner: 'salmon', dietaryRestrictions: 'Shellfish allergy' },
    { id: 16, name: 'Mia Thompson', attending: true, guests: 1, dinner: 'vegetarian', dietaryRestrictions: '' },
    { id: 17, name: 'Henry White', attending: true, guests: 2, dinner: 'steak', dietaryRestrictions: '' },
    { id: 18, name: 'Charlotte Harris', attending: true, guests: 1, dinner: 'salmon', dietaryRestrictions: '' },
    { id: 19, name: 'Michael Sanchez', attending: true, guests: 2, dinner: 'vegetarian', dietaryRestrictions: 'Gluten-free' },
    { id: 20, name: 'Amelia Clark', attending: true, guests: 2, dinner: 'steak', dietaryRestrictions: '' },
    { id: 21, name: 'Elijah Lewis', attending: true, guests: 1, dinner: 'salmon', dietaryRestrictions: '' },
    { id: 22, name: 'Harper Young', attending: true, guests: 2, dinner: 'vegetarian', dietaryRestrictions: 'Vegan' },
    { id: 23, name: 'Lucas Allen', attending: true, guests: 1, dinner: 'steak', dietaryRestrictions: '' },
    { id: 24, name: 'Scarlett King', attending: false, guests: 0, dinner: '', dietaryRestrictions: '' },
    { id: 25, name: 'Levi Wright', attending: true, guests: 2, dinner: 'salmon', dietaryRestrictions: 'Nut allergy' },
    { id: 26, name: 'Victoria Scott', attending: true, guests: 1, dinner: 'vegetarian', dietaryRestrictions: '' },
    { id: 27, name: 'Wyatt Green', attending: true, guests: 2, dinner: 'steak', dietaryRestrictions: '' },
    { id: 28, name: 'Sofia Baker', attending: true, guests: 1, dinner: 'salmon', dietaryRestrictions: 'Dairy-free' },
    { id: 29, name: 'Owen Hill', attending: true, guests: 3, dinner: 'vegetarian', dietaryRestrictions: '' },
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
      
        // Calculate the total spend
        state.totalSpend = Object.values(state.selectedVendors).reduce((total, vendor) => total + (vendor ? vendor.price : 0), 0);
      },
  },
});

export const { setSelectedVendor } = vendorSlice.actions;

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