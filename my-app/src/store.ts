import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Vendor {
  id: number;
  name: string;
  type: string;
}

interface AppState {
  selectedVendors: {
    photography?: Vendor;
    venue?: Vendor;
    catering?: Vendor;
  };
}

const initialAppState: AppState = {
  selectedVendors: {},
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: initialAppState,
  reducers: {
    setSelectedVendor(state, action: PayloadAction<Vendor>) {
      const vendor = action.payload;
      state.selectedVendors[vendor.type.toLowerCase() as keyof AppState['selectedVendors']] = vendor;
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