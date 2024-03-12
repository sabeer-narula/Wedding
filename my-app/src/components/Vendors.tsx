import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, firestore } from '../firebase';
import { doc, setDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import Header from './Header';
import vendorData from '../vendorData';
import { setSelectedVendor, setSelectedVendors } from '../store';

interface Vendor {
  id: number;
  name: string;
  type: string;
  price: number;
  photos: string[];
  reviews: { rating: number; review: string }[];
}

const Vendors = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedType, setSelectedType] = useState('');

  const selectVendor = async (vendor: Vendor) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const vendorRef = doc(firestore, 'users', user.uid, 'selectedVendors', vendor.type);
        await setDoc(vendorRef, {
          id: vendor.id,
          name: vendor.name,
          type: vendor.type,
          price: vendor.price,
        });
  
        // Fetch the updated selected vendors data from Firestore
        const snapshot = await getDocs(collection(firestore, 'users', user.uid, 'selectedVendors'));
        const updatedSelectedVendors: { [key: string]: Vendor } = {};
        snapshot.forEach((doc) => {
          const data = doc.data() as Vendor;
          updatedSelectedVendors[data.type] = data;
        });
  
        // Update the Redux store with the latest selected vendors data
        dispatch(setSelectedVendors(updatedSelectedVendors));
      }
    } catch (error) {
      console.error('Error saving selected vendor:', error);
    }
  };


  const handleViewVendor = (vendorId: number) => {
    history.push(`/vendors/${vendorId}`);
  };

  const handleSubmit = () => {
    history.push('/');
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const filteredVendors = selectedType
    ? vendorData.filter((vendor) => vendor.type === selectedType)
    : vendorData;

  const calculateAverageRating = (reviews: { rating: number; review: string }[]) => {
    if (reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / reviews.length);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold underline mb-4">Select Vendors</h2>
        <div className="mb-4">
          <label htmlFor="vendorType" className="block mb-2">Filter by Vendor Type:</label>
          <select
            id="vendorType"
            className="w-full px-3 py-2 border rounded"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="">All</option>
            <option value="photography">Photography</option>
            <option value="venue">Venue</option>
            <option value="catering">Catering</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
          {filteredVendors.map((vendor) => (
            <div key={vendor.id} className="border p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <img src={process.env.PUBLIC_URL + vendor.photos[0]} alt={vendor.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">{vendor.name}</h3>
                  <p className="text-gray-600">${vendor.price}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(calculateAverageRating(vendor.reviews))].map((_, index) => (
                      <svg key={index} className="w-4 h-4 fill-current text-yellow-500 mr-1" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleViewVendor(vendor.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Details
                </button>
                <button
                  onClick={() => selectVendor(vendor)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Select
                </button>
              </div>
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