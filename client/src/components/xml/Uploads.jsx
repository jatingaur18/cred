import { useState, useEffect, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../../contexts/ThemeContext';
import {
    Upload,
    AlertCircle,
    CheckCircle2,
    Loader2,
    FileText,
    User,
    Phone,
    CreditCard,
    ChevronRight,
    Search,
    SlidersHorizontal,
    Calendar,
    ArrowUpDown,
    Download,
    Trash2,
    Filter
} from 'lucide-react';

const FileUploadWithProfiles = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        scoreRange: [0, 900],
        dateRange: 'all',
        sortBy: 'date',
        sortOrder: 'desc'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const nav = useNavigate();

    // Access ThemeContext
    const { isDarkMode } = useContext(ThemeContext);

    // Tailwind classes based on theme
    const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
    const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-600';
    const cardBgColor = isDarkMode ? 'bg-gray-800/80' : 'bg-white/80';
    const cardTextColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
    const shadowColor = isDarkMode ? 'shadow-none' : 'shadow-xl';
    const inputBorderColor = isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-200';
    const hoverBorderColor = isDarkMode ? 'hover:border-blue-500' : 'hover:border-blue-400';
    const filterBgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
    const profileHoverColor = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50/50';
    const iconColor = isDarkMode ? 'text-gray-400' : 'text-gray-400';  //Adjust if needed
    const buttonTextColor = isDarkMode ? 'text-white' : 'text-gray-700';
    const buttonHoverColor = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-blue-50';
    const disabledButtonColor = isDarkMode ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-300 cursor-not-allowed';
    const enabledButtonColor = isDarkMode ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:-translate-y-0.5' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:-translate-y-0.5'; //Kept same as lightmode

    useEffect(() => {
        fetchProfiles();
    }, [response]);

    const fetchProfiles = async () => {
        try {
            const response = await fetch('http://localhost:3000/fetchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: { username: localStorage.getItem('username') } }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profiles');
            }

            const data = await response.json();
            setProfiles(data);
        } catch (err) {
            setError('Failed to load profiles: ' + err.message);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'text/xml') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please select a valid XML file');
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Upload failed');
            }

            setResponse(data);
            await fetchProfiles();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredProfiles = useMemo(() => {
        return profiles
            .filter(profile => {
                const fullName = `${profile.basicDetails.name.firstName} ${profile.basicDetails.name.lastName}`.toLowerCase();
                const searchMatch = fullName.includes(searchTerm.toLowerCase()) ||
                    profile.basicDetails.pan.includes(searchTerm) ||
                    profile.basicDetails.mobilePhone.includes(searchTerm);

                const scoreMatch = parseInt(profile.basicDetails.creditScore) >= filters.scoreRange[0] &&
                    parseInt(profile.basicDetails.creditScore) <= filters.scoreRange[1];

                return searchMatch && scoreMatch;
            })
            .sort((a, b) => {
                if (filters.sortBy === 'name') {
                    const nameA = `${a.basicDetails.name.firstName} ${a.basicDetails.name.lastName}`;
                    const nameB = `${b.basicDetails.name.firstName} ${b.basicDetails.name.lastName}`;
                    return filters.sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
                } else if (filters.sortBy === 'score') {
                    return filters.sortOrder === 'asc'
                        ? parseInt(a.basicDetails.creditScore) - parseInt(b.basicDetails.creditScore)
                        : parseInt(b.basicDetails.creditScore) - parseInt(a.basicDetails.creditScore);
                }
                // Add more sort options as needed
                return 0;
            });
    }, [profiles, searchTerm, filters]);

    const handleExportSelected = () => {
        // Implementation for exporting selected profiles
        console.log('Exporting profiles:', selectedProfiles);
    };

    const handleDeleteSelected = () => {
        // Implementation for deleting selected profiles
        console.log('Deleting profiles:', selectedProfiles);
    };

    return (
        <div className={`min-h-screen ${bgColor} ${textColor} py-12 transition-colors duration-300`}>
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative max-w-5xl mx-auto px-4">
                <div className={`${cardBgColor} ${shadowColor} backdrop-blur-sm rounded-2xl p-8 mb-8 transition-colors duration-300`}>
                    <div className="mb-8">
                        <h2 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 transition-colors duration-300`}>
                            Upload Credit Report
                        </h2>
                        <p className={`${textColor} transition-colors duration-300`}>Process your XML credit report files securely</p>
                    </div>

                    <div className="space-y-6">
                        <div className={`border-2 border-dashed ${inputBorderColor} rounded-xl p-8 bg-white/50 transition-all duration-300 ${hoverBorderColor}`}>
                            <input
                                type="file"
                                accept=".xml"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col items-center"
                            >
                                {file ? (
                                    <>
                                        <FileText className="h-16 w-16 text-blue-500 mb-3" />
                                        <span className="text-blue-600 font-medium mb-1">{file.name}</span>
                                        <span className="text-sm text-gray-500">Click to change file</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className={`h-16 w-16 ${iconColor} mb-3 transition-colors duration-300`} />
                                        <span className={`text-lg ${textColor} font-medium mb-1 transition-colors duration-300`}>Drop your XML file here</span>
                                        <span className="text-sm text-gray-500">or click to browse</span>
                                    </>
                                )}
                            </label>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={!file || loading}
                            className={`w-full py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                !file || loading
                                    ? `${disabledButtonColor}`
                                    : `${enabledButtonColor}`
                            } ${buttonTextColor} font-medium`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Upload and Process'
                            )}
                        </button>

                        {error && (
                            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {response && (
                            <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                                <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                                <p className="text-sm">{response.message}</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Search and Filters Section */}
                <div className={`${cardBgColor} ${shadowColor} backdrop-blur-sm rounded-2xl p-8 mb-8 transition-colors duration-300`}>
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconColor} w-5 h-5 transition-colors duration-300`} />
                            <input
                                type="text"
                                placeholder="Search by name, PAN, or mobile number..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2 rounded-xl border ${inputBorderColor} focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all ${textColor}`}
                            />
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center px-4 py-2 rounded-xl border ${inputBorderColor} ${hoverBorderColor} transition-all ${buttonTextColor} ${buttonHoverColor}`}
                        >
                            <SlidersHorizontal className="w-5 h-5 mr-2" />
                            Filters
                        </button>

                        {/* Bulk Actions */}
                        <div className="flex space-x-2">
                            <button
                                onClick={handleExportSelected}
                                disabled={selectedProfiles.length === 0}
                                className={`flex items-center px-4 py-2 rounded-xl border ${inputBorderColor} ${hoverBorderColor} transition-all disabled:opacity-50 disabled:cursor-not-allowed ${buttonTextColor} ${buttonHoverColor}`}
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Export
                            </button>
                            <button
                                onClick={handleDeleteSelected}
                                disabled={selectedProfiles.length === 0}
                                className={`flex items-center px-4 py-2 rounded-xl border border-red-200 text-red-600 ${buttonHoverColor} transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <Trash2 className="w-5 h-5 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className={`p-4 ${filterBgColor} rounded-xl mb-6 transition-colors duration-300`}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Score Range Filter */}
                                <div>
                                    <label className={`block text-sm font-medium ${textColor} mb-2 transition-colors duration-300`}>Credit Score Range</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            min="0"
                                            max="900"
                                            value={filters.scoreRange[0]}
                                            onChange={(e) => setFilters({
                                                ...filters,
                                                scoreRange: [parseInt(e.target.value), filters.scoreRange[1]]
                                            })}
                                            className={`w-24 px-3 py-2 rounded-lg border ${inputBorderColor} ${textColor}`}
                                        />
                                        <span>to</span>
                                        <input
                                            type="number"
                                            min="0"
                                            max="900"
                                            value={filters.scoreRange[1]}
                                            onChange={(e) => setFilters({
                                                ...filters,
                                                scoreRange: [filters.scoreRange[0], parseInt(e.target.value)]
                                            })}
                                            className={`w-24 px-3 py-2 rounded-lg border ${inputBorderColor} ${textColor}`}
                                        />
                                    </div>
                                </div>

                                {/* Sort By Filter */}
                                <div>
                                    <label className={`block text-sm font-medium ${textColor} mb-2 transition-colors duration-300`}>Sort By</label>
                                    <select
                                        value={filters.sortBy}
                                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                        className={`w-full px-3 py-2 rounded-lg border ${inputBorderColor} ${textColor}`}
                                    >
                                        <option value="date">Date</option>
                                        <option value="name">Name</option>
                                        <option value="score">Credit Score</option>
                                    </select>
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <label className={`block text-sm font-medium ${textColor} mb-2 transition-colors duration-300`}>Sort Order</label>
                                    <button
                                        onClick={() => setFilters({
                                            ...filters,
                                            sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
                                        })}
                                        className={`flex items-center px-4 py-2 rounded-lg border ${inputBorderColor} ${hoverBorderColor} transition-all ${buttonTextColor} ${buttonHoverColor}`}
                                    >
                                        <ArrowUpDown className="w-5 h-5 mr-2" />
                                        {filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Stats Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-xl transition-colors duration-300`}>
                            <div className={`text-sm ${textColor} transition-colors duration-300`}>Total Profiles</div>
                            <div className="text-2xl font-semibold">{profiles.length}</div>
                        </div>
                        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} p-4 rounded-xl transition-colors duration-300`}>
                            <div className={`text-sm ${textColor} transition-colors duration-300`}>High Score (750+)</div>
                            <div className="text-2xl font-semibold">
                                {profiles.filter(p => parseInt(p.basicDetails.creditScore) >= 750).length}
                            </div>
                        </div>
                        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'} p-4 rounded-xl transition-colors duration-300`}>
                            <div className={`text-sm ${textColor} transition-colors duration-300`}>Medium Score (650-749)</div>
                            <div className="text-2xl font-semibold">
                                {profiles.filter(p => parseInt(p.basicDetails.creditScore) >= 650 && parseInt(p.basicDetails.creditScore) < 750).length}
                            </div>
                        </div>
                        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-red-50'} p-4 rounded-xl transition-colors duration-300`}>
                            <div className={`text-sm ${textColor} transition-colors duration-300`}>Low Score ({"<650"})</div>
                            <div className="text-2xl font-semibold">
                                {profiles.filter(p => parseInt(p.basicDetails.creditScore) < 650).length}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Profiles List */}
                <div className={`${cardBgColor} ${shadowColor} backdrop-blur-sm rounded-2xl p-8 transition-colors duration-300`}>
                    <h2 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 transition-colors duration-300`}>
                        Credit Profiles ({filteredProfiles.length})
                    </h2>
                    <div className="divide-y divide-gray-200">
                        {filteredProfiles.map((profile) => (
                            <div
                                key={profile._id}
                                className={`py-6 ${profileHoverColor} transition duration-300 rounded-xl px-4 -mx-4`}
                            >
                                <div className="flex items-center mb-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedProfiles.includes(profile._id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedProfiles([...selectedProfiles, profile._id]);
                                            } else {
                                                setSelectedProfiles(selectedProfiles.filter(id => id !== profile._id));
                                            }
                                        }}
                                        className="mr-4 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={() => nav(`/profile/${profile._id}`)}
                                        className="flex-1 flex items-center justify-between group"
                                    >
                                        {/* Profile Details (Example) */}
                                        <div>
                                            <div className={`font-semibold ${cardTextColor} transition-colors duration-300`}>
                                                {profile.basicDetails.name.firstName} {profile.basicDetails.name.lastName}
                                            </div>
                                            <div className={`text-sm ${textColor} transition-colors duration-300`}>
                                                Score: {profile.basicDetails.creditScore}
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploadWithProfiles;
