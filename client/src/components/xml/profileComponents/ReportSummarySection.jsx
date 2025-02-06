import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { COLORS } from '../services/profileService';

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, darkMode }) => {
  if (percent < 0.05) return null;
  
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={darkMode ? "white" : "black"}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-4 rounded-lg shadow-lg ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        <p className="font-semibold">{payload[0].payload.label}</p>
        <p>Balance: ₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export const ReportSummarySection = ({ darkMode, profileData }) => {
  const balanceData = profileData.creditAccounts.all.map(account => ({
    name: account.accountNumber,
    value: account.currentBalance,
    label: `${account.accountNumber} (₹${account.currentBalance.toLocaleString()})`
  }));

  const summaryCards = [
    { title: 'Total Accounts', value: profileData.reportSummary.totalAccounts, color: 'blue' },
    { title: 'Active Accounts', value: profileData.reportSummary.activeAccounts, color: 'green' },
    { title: 'Closed Accounts', value: profileData.reportSummary.closedAccounts, color: 'red' },
    { title: 'Current Balance', value: `₹${profileData.reportSummary.currentBalanceTotal.toLocaleString()}`, color: 'purple' },
    { title: 'Secured Amount', value: `₹${profileData.reportSummary.securedAmount.toLocaleString()}`, color: 'indigo' },
    { title: 'Unsecured Amount', value: `₹${profileData.reportSummary.unsecuredAmount.toLocaleString()}`, color: 'pink' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <div key={index} className={`rounded-xl shadow-lg p-6 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-${card.color}-500 text-sm font-semibold`}>{card.title}</h3>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Balance Distribution</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={balanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                // label={props => CustomLabel({ ...props, darkMode })}
              >
                {balanceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={darkMode ? COLORS.dark[index % COLORS.dark.length] : COLORS.light[index % COLORS.light.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={props => CustomTooltip({ ...props, darkMode })} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value, entry) => {
                  const data = entry.payload;
                  return `${data.name} - ₹${data.value.toLocaleString()}`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};