import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface Vendor {
  id: number;
  name: string;
  service: string;
  cost: number;
}

interface Guest {
  id: number;
  name: string;
  invitationStatus: 'Invited' | 'Confirmed' | 'Declined';
}

const Dashboard: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [guests, setGuests] = useState<Guest[]>([]);

  // Retrieve the selected vendor from Redux store
  const selectedVendor = useSelector((state: RootState) => state.vendor.selectedVendor);

  // Example function to add a vendor
  const addVendor = (vendor: Vendor) => {
    setVendors([...vendors, vendor]);
  };

  // Example function to add a guest
  const addGuest = (guest: Guest) => {
    setGuests([...guests, guest]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Wedding Planning Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Selected Vendor</h2>
          {/* Display selected vendor from Redux store */}
          {selectedVendor ? (
              <p>Selected Vendor: {selectedVendor.name}</p>
          ) : (
              <p>No vendor selected</p>
          )}
        </div>

        {/* Budget Section */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Budget</h2>
          {/* Display budget information here */}
        </div>

        {/* Guests Section */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Guests</h2>
          {/* List guests here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
