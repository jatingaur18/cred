import React from 'react';
import { FileText, BarChart, CreditCard } from 'lucide-react';

const tabs = [
  { id: 'basic', icon: FileText, label: 'Basic Details' },
  { id: 'summary', icon: BarChart, label: 'Report Summary' },
  { id: 'accounts', icon: CreditCard, label: 'Credit Accounts' }
];

export const TabButton = ({ darkMode, activeTab, setActiveTab }) => {
  const TabItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
        activeTab === id
          ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
          : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      {tabs.map(tab => (
        <TabItem key={tab.id} {...tab} />
      ))}
    </>
  );
};