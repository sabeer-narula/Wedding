import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Vendor {
    id: number;
    name: string;
  }

interface VendorContextType {
  vendor: Vendor | null; // Assuming Vendor is an interface you've defined
  setVendor: React.Dispatch<React.SetStateAction<Vendor | null>>;
}

const VendorContext = createContext<VendorContextType | null>(null);

export const useVendorContext = () => {
  const context = useContext(VendorContext);
  if (!context) throw new Error("useVendorContext must be used within a VendorProvider");
  return context;
}

export const VendorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vendor, setVendor] = useState<Vendor | null>(() => {
    // Try to get the vendor from localStorage
    const savedVendor = localStorage.getItem('selectedVendor');
    return savedVendor ? JSON.parse(savedVendor) : null;
  });

  // Update localStorage whenever the vendor changes
  useEffect(() => {
    if (vendor) {
      localStorage.setItem('selectedVendor', JSON.stringify(vendor));
    } else {
      localStorage.removeItem('selectedVendor');
    }
  }, [vendor]);

  return (
    <VendorContext.Provider value={{ vendor, setVendor }}>
      {children}
    </VendorContext.Provider>
  );
};

