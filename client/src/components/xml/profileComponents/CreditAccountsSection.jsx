import React from 'react';
import { Building, CreditCard, DollarSign, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

export const CreditAccountsSection = ({ darkMode, profileData }) => {
  const overdueData = profileData.creditAccounts.all.map(account => ({
    name: account.accountNumber,
    amount: account.amountOverdue
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}>
          <p className="font-semibold">Account: {label}</p>
          <p>Overdue: ₹{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Overdue Analysis</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={overdueData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 
              />
              <XAxis 
                dataKey="name" 
                stroke={darkMode ? '#fff' : '#000'} 
                tick={{ fill: darkMode ? '#fff' : '#000' }}
              />
              <YAxis 
                stroke={darkMode ? '#fff' : '#000'} 
                tick={{ fill: darkMode ? '#fff' : '#000' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke={darkMode ? '#8884d8' : '#6366f1'} 
                fill={darkMode ? 'rgba(136, 132, 216, 0.3)' : 'rgba(99, 102, 241, 0.3)'} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileData.creditAccounts.all.map((account, index) => (
          <div 
            key={index} 
            className={`rounded-xl shadow-md p-6 ${
              account.amountOverdue > 0 
                ? 'border-l-4 border-red-500' 
                : 'border-l-4 border-green-500'
            } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <Building className={`w-6 h-6 ${
                  darkMode ? 'text-blue-400' : 'text-blue-500'
                } mr-2`} />
                <h3 className="text-lg font-semibold capitalize">{account.bank}</h3>
              </div>
              {account.amountOverdue > 0 && (
                <span className={`px-3 py-1 rounded-full text-sm ${
                  darkMode 
                    ? 'bg-red-900 text-red-100' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  Overdue
                </span>
              )}
            </div>

            <div className="space-y-2">
              <p className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2 opacity-70" />
                <span>{account.accountNumber}</span>
              </p>
              <p className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 opacity-70" />
                <span>Balance: ₹{account.currentBalance.toLocaleString()}</span>
              </p>
              {account.amountOverdue > 0 && (
                <p className={`flex items-center ${
                  darkMode ? 'text-red-400' : 'text-red-500'
                }`}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span>Overdue: ₹{account.amountOverdue.toLocaleString()}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};