import React from 'react';
import { useHistory } from 'react-router-dom';
import { useVendorContext } from './VendorContext';

const Vendors = () => {
  const { setVendor } = useVendorContext();
  const history = useHistory();
  const vendors = [{ id: 1, name: 'Vendor A' }, { id: 2, name: 'Vendor B' }]; // Example vendors

  interface Vendor {
    id: number;
    name: string;
  }

  const selectVendor = (vendor: Vendor) => {
    setVendor(vendor); // Update the global state with selected vendor
    history.push('/'); // Navigate back to the dashboard
  };

  return (
    <div>
      <h2>Select a Vendor</h2>
      <ul>

    {vendors.map((vendor) => (
    <li key={vendor.id}>
        {vendor.name} <button onClick={() => selectVendor(vendor)}>Select</button>
    </li>
    ))}

      </ul>
    </div>
  );
};

export default Vendors;
