import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Header from './Header';
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Vendor {
  id: number;
  name: string;
  type: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const [selectedVendors, setSelectedVendors] = useState<{ [key: string]: Vendor }>({});
  const guests = useSelector((state: RootState) => state.guest.guests);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const totalSpend = Object.values(selectedVendors).reduce(
    (total, vendor) => total + (vendor?.price || 0),
    0
  );

  const vendorData = Object.entries(selectedVendors).map(([type, vendor], index) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: vendor?.price || 0,
    color: COLORS[index % COLORS.length],
  }));
  const rsvpData = [
    { name: 'Attending', value: guests.filter((guest) => guest.attending).length },
    { name: 'Not Attending', value: guests.filter((guest) => !guest.attending).length },
  ];

  const dinnerData = [
    { name: 'Steak', value: guests.filter((guest) => guest.dinner === 'steak').length },
    { name: 'Salmon', value: guests.filter((guest) => guest.dinner === 'salmon').length },
    { name: 'Vegetarian', value: guests.filter((guest) => guest.dinner === 'vegetarian').length },
  ];

  const totalAttending = guests.reduce((total, guest) => total + (guest.attending ? guest.guests : 0), 0);

  useEffect(() => {
    const fetchSelectedVendors = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const snapshot = await getDocs(collection(firestore, 'users', user.uid, 'selectedVendors'));
          const vendorData: { [key: string]: Vendor } = {};
          snapshot.forEach((doc) => {
            const data = doc.data() as Vendor;
            vendorData[data.type] = data;
          });
          setSelectedVendors(vendorData);
        }
      } catch (error) {
        console.error('Error fetching selected vendors:', error);
      }
    };

    fetchSelectedVendors();
  }, []);

  return (
    <><Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold underline mb-4">Wedding Planning Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <p>Total Spend: ${totalSpend}</p>
            <PieChart width={400} height={400}>
              <Pie
                data={vendorData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vendorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} (${((value / totalSpend) * 100).toFixed(2)}%)`,
                  name,
                ]}
              />
              <Legend />
            </PieChart>
          </div>

          {/* Guests Section */}
          <div className="border p-4 rounded-lg mt-4 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-2">Guests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">RSVP Summary</h3>
                <PieChart width={400} height={400}>
                  <Pie
                    data={rsvpData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {rsvpData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value} (${((value / guests.length) * 100).toFixed(2)}%)`,
                      name,
                    ]}
                  />
                  <Legend />
                </PieChart>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Dinner Choices</h3>
                <BarChart width={400} height={400} data={dinnerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </div>
            </div>
            <p className="text-lg mt-4">Total Attending: {totalAttending}</p>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Attending</th>
                  <th className="px-4 py-2">Guests</th>
                  <th className="px-4 py-2">Dinner</th>
                  <th className="px-4 py-2">Dietary Restrictions</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id}>
                    <td className="border px-4 py-2">{guest.name}</td>
                    <td className="border px-4 py-2">{guest.attending ? 'Accepts' : 'Declines'}</td>
                    <td className="border px-4 py-2">{guest.attending ? guest.guests : '-'}</td>
                    <td className="border px-4 py-2">{guest.attending ? guest.dinner : '-'}</td>
                    <td className="border px-4 py-2">{guest.attending ? guest.dietaryRestrictions : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div></>
  );
};

export default Dashboard;