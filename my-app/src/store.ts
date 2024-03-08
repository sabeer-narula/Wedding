import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Vendor {
  id: number;
  name: string;
  type: string;
  price: number;
}

interface AppState {
    selectedVendors: {
      photography?: Vendor;
      venue?: Vendor;
      catering?: Vendor;
    };
    totalSpend: number;
  }
  
  const initialAppState: AppState = {
    selectedVendors: {},
    totalSpend: 0,
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

export const store = configureStore({
  reducer: {
    vendor: vendorSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;