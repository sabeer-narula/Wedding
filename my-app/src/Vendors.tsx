import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedVendor } from './store';
import Header from './Header';

const Vendors = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const vendors = {
    photography: [
      { id: 1, name: "Steven's Wedding Photography", type: 'photography', price: 1500 },
      { id: 2, name: "Capture The Moment", type: 'photography', price: 2000 },
      { id: 3, name: "Dream Shots", type: 'photography', price: 1800 }
    ],
    venue: [
      { id: 4, name: "Martha's Vineyard", type: 'venue', price: 15000 },
      { id: 5, name: "Elegant Affairs", type: 'venue', price: 6000 },
      { id: 6, name: "Celebrate in Style", type: 'venue', price: 3500 }
    ],
    catering: [
      { id: 7, name: "Gourmet Wedding Feasts", type: 'catering', price: 3000 },
      { id: 8, name: "Savory Celebrations", type: 'catering', price: 3500 },
      { id: 9, name: "Bites and Delights", type: 'catering', price: 2800 }
    ]
  };

  interface Vendor {
    id: number;
    name: string;
    type: string;
    price: number;
  }

  const selectVendor = (vendor: Vendor) => {
    dispatch(setSelectedVendor(vendor));
  };

  const handleViewVendor = (vendorId: number) => {
    history.push(`/vendors/${vendorId}`);
  };

  const handleSubmit = () => {
    history.push('/');
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold underline mb-4">Select Vendors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(vendors).map(([category, options]) => (
            <div key={category} className="border p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <ul>
            {options.map((vendor) => (
                <li key={vendor.id} className="mb-2">
                <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleViewVendor(vendor.id)}
                >
                    {vendor.name}
                </span>{' '}
                - ${vendor.price}
                <button
                    onClick={() => selectVendor(vendor)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
                >
                    Select
                </button>
                </li>
            ))}
            </ul>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
          Submit
        </button>
      </div>
    </>
  );
};

export default Vendors;