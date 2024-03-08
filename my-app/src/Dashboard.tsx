import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface Vendor {
  id: number;
  name: string;
  type: string;
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

  const selectedVendors = useSelector((state: RootState) => state.vendor.selectedVendors);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Wedding Planning Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Selected Vendors Section */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Selected Vendors</h2>
          {Object.entries(selectedVendors).map(([vendorType, vendor]) => (
            <div key={vendorType}>
              <h3 className="text-xl font-semibold">{vendorType.charAt(0).toUpperCase() + vendorType.slice(1)}</h3>
              {vendor ? (
                <p>{vendor.name}</p>
              ) : (
                <p>No {vendorType} selected</p>
              )}
            </div>
          ))}
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