import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Header from './header';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard: React.FC = () => {
  const selectedVendors = useSelector((state: RootState) => state.vendor.selectedVendors);
  const totalSpend = useSelector((state: RootState) => state.vendor.totalSpend);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const data = Object.entries(selectedVendors).map(([type, vendor], index) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: vendor ? vendor.price : 0,
    color: COLORS[index % COLORS.length],
  }));


  return (
    <><Header />
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
          <p>Total Spend: ${totalSpend}</p>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

              {/* Guests Section */}
              <div className="border p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-2">Guests</h2>
                  {/* List guests here */}
              </div>
          </div>
      </div></>
  );
};

export default Dashboard;