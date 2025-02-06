import React from 'react';
import { MapPin } from 'lucide-react';

export const BasicDetailsSection = ({ darkMode, profileData }) => (
  <div className="space-y-6">
    <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm opacity-70">Full Name</label>
            <p className="text-lg font-semibold">
              {profileData.basicDetails.name.firstName} {profileData.basicDetails.name.lastName}
            </p>
          </div>
          <div>
            <label className="text-sm opacity-70">PAN</label>
            <p className="text-lg font-semibold">{profileData.basicDetails.pan}</p>
          </div>
          <div>
            <label className="text-sm opacity-70">Mobile Number</label>
            <p className="text-lg font-semibold">{profileData.basicDetails.mobilePhone}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className={`rounded-xl p-6 text-center ${
            darkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <div className="text-4xl font-bold text-blue-500">
              {profileData.basicDetails.creditScore}
            </div>
            <div className="text-sm mt-2">Credit Score</div>
          </div>
        </div>
      </div>
    </div>

    <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-semibold mb-4">Registered Addresses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileData.creditAccounts.addresses.map((address, index) => (
          <div key={index} className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-semibold">Address {index + 1}</span>
            </div>
            <div className="space-y-1 ml-7">
              <p>{address.line1}</p>
              <p>{address.line2}</p>
              {address.line3 && <p>{address.line3}</p>}
              <p>{address.city}, {address.state} - {address.pincode}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);