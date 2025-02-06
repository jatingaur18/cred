export const fetchProfileData = async (id) => {
    const response = await fetch(`http://localhost:3000/fetchprofile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
  
    return await response.json();
  };
  
  export const COLORS = {
    light: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    dark: ['#60A5FA', '#34D399', '#FBBF24', '#F87171']
  };