export const checkAuthAndNavigate = (navigate) => {
    
    const authData = localStorage.getItem('authEmployee');
    
    if (authData) {
      const { data } = JSON.parse(authData);
      const role = data.length > 0 ? data[0].role : null; // Assuming data is an array with role inside
  
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'employee') {
        navigate('/employee');
      }
    
    }
  };
  