import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { TabButton } from './profileComponents/TabButton';
import { BasicDetailsSection } from './profileComponents/BasicDetailsSection';
import { ReportSummarySection } from './profileComponents/ReportSummarySection';
import { CreditAccountsSection } from './profileComponents/CreditAccountsSection';
import { fetchProfileData } from './services/profileService';
import ThemeContext from '../../contexts/ThemeContext';
const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');

  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const { id } = useParams();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfileData(id);
        setProfileData(data);
      } catch (err) {
        setError('Failed to load profile: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (!profileData) {
    return <div className="flex justify-center items-center min-h-screen">No profile data available</div>;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <TabButton darkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="mt-6">
          {activeTab === 'basic' && <BasicDetailsSection darkMode={isDarkMode} profileData={profileData} />}
          {activeTab === 'summary' && <ReportSummarySection darkMode={isDarkMode} profileData={profileData} />}
          {activeTab === 'accounts' && <CreditAccountsSection darkMode={isDarkMode} profileData={profileData} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;