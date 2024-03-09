import React from 'react';
import { useParams } from 'react-router-dom';
import vendorData from './vendorData';
import Header from './Header';

const VendorPage: React.FC = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const vendor = vendorData.find((v) => v.id === parseInt(vendorId));

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return (
    <>
    <Header />
    <div className="container mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-8">
              <h1 className="text-4xl font-script text-center text-gold mb-8">{vendor.name}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                      <img src={process.env.PUBLIC_URL + vendor.photos[0]} alt={vendor.name} className="w-full h-auto rounded-lg shadow-md" />
                  </div>
                  <div>
                      <h2 className="text-2xl font-script text-gold mb-4">Reviews</h2>
                      {vendor.reviews.map((review, index) => (
                          <div key={index} className="mb-4">
                              <p className="font-semibold">{review.rating} stars</p>
                              <p className="text-gray-600">{review.review}</p>
                          </div>
                      ))}
                      <h2 className="text-2xl font-script text-gold mb-4">Pricing</h2>
                      <p className="text-xl font-semibold">${vendor.price}</p>
                      <h2 className="text-2xl font-script text-gold mb-4">Details</h2>
                      <p className="text-gray-600">{vendor.details}</p>
                      <h2 className="text-2xl font-script text-gold mb-4">Contact</h2>
                      <p className="text-gray-600">{vendor.contact}</p>
                  </div>
              </div>
          </div>
      </div></>
  );
};

export default VendorPage;