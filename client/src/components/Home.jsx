import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const bgColor = isDarkMode
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-600';
  const cardBgColor = isDarkMode ? 'bg-gray-700/80' : 'bg-white/80';
  const cardTextColor = isDarkMode ? 'text-gray-200' : 'text-gray-800';
  const shadowColor = isDarkMode ? 'shadow-gray-600/50' : 'shadow-xl';
  const hoverShadowColor = isDarkMode ? 'shadow-gray-600/70' : 'shadow-2xl';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to CreditSea
          </h1>
          <p className={`text-2xl ${textColor} font-light transition-colors duration-300`}>
            Transform Your Credit Data Into Clear Insights
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/fileupload')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Get Started
              <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className={`${cardBgColor} backdrop-blur-sm p-8 rounded-2xl ${shadowColor} hover:${hoverShadowColor} transition-shadow duration-300`}>
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className={`text-2xl font-semibold ${cardTextColor} mb-3 transition-colors duration-300`}>Smart Processing</h2>
              <p className={`${textColor} transition-colors duration-300`}>
                Upload your XML credit reports and let our intelligent system handle the rest. Get instant analysis and clear visualization of your credit data.
              </p>
            </div>
          </div>

          <div className={`${cardBgColor} backdrop-blur-sm p-8 rounded-2xl ${shadowColor} hover:${hoverShadowColor} transition-shadow duration-300`}>
            <div className="mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h2 className={`text-2xl font-semibold ${cardTextColor} mb-3 transition-colors duration-300`}>Secure & Reliable</h2>
              <p className={`${textColor} transition-colors duration-300`}>
                Your data security is our top priority. We use enterprise-grade encryption and secure processing to protect your sensitive information.
              </p>
            </div>
          </div>
        </div>

        <div className={`${cardBgColor} backdrop-blur-sm rounded-2xl ${shadowColor} p-8 mb-16 transition-shadow duration-300`}>
          <h2 className={`text-3xl font-semibold ${cardTextColor} mb-8 text-center transition-colors duration-300`}>How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📤",
                title: "Upload",
                description: "Simply upload your XML credit report file"
              },
              {
                icon: "⚡",
                title: "Process",
                description: "Our system automatically extracts and analyzes the data"
              },
              {
                icon: "📋",
                title: "View",
                description: "Get a comprehensive, easy-to-read credit report"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className={`text-xl font-semibold ${cardTextColor} mb-2 transition-colors duration-300`}>{step.title}</h3>
                <p className={`${textColor} transition-colors duration-300`}>{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-r from-blue-100 to-purple-100 transform translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🚀",
              title: "Fast Processing",
              description: "Get results in seconds"
            },
            {
              icon: "📱",
              title: "Mobile Friendly",
              description: "Access reports on any device"
            },
            {
              icon: "🔄",
              title: "Auto Updates",
              description: "Always get the latest data"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`${cardBgColor} backdrop-blur-sm p-6 rounded-xl ${shadowColor} hover:${hoverShadowColor} transition-shadow duration-300`}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className={`font-semibold ${cardTextColor} mb-2 transition-colors duration-300`}>{feature.title}</h3>
              <p className={`${textColor} text-sm transition-colors duration-300`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
