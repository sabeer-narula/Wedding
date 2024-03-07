// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Vendor {
  id: number;
  name: string;
}

interface AppState {
  selectedVendor: Vendor | null;
}

const initialAppState: AppState = {
  selectedVendor: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: initialAppState,
  reducers: {
    setSelectedVendor(state, action: PayloadAction<Vendor | null>) {
      state.selectedVendor = action.payload;
    },
  },
});

export const { setSelectedVendor } = vendorSlice.actions;

export const store = configureStore({
  reducer: {
    vendor: vendorSlice.reducer,
  },
});

// TypeScript type for RootState
export type RootState = ReturnType<typeof store.getState>;

// TypeScript type for AppDispatch
export type AppDispatch = typeof store.dispatch;
