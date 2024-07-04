export const checkAuthAndNavigate = (navigate) => {
    
    const authData = localStorage.getItem('authEmployee');
    const token = localStorage.getItem('token');
    
    if (authData) {
      const { data } = JSON.parse(authData);
      const role = data.length > 0 ? data[0].user_type : null; // Assuming data is an array with role inside
  
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'employee') {
        navigate('/employee');
      } else if (role === 'marketing') {
        navigate('/marketing');
      }
    
    }
  };

  export const getLoggedInUser = () => {
    const loginUser = localStorage.getItem('authEmployee');
  
    if (!loginUser) {
      return { message: 'No data found', status: false };
    }
  
    try {
      const parsedUser = JSON.parse(loginUser);
  
      if (parsedUser && parsedUser.data && parsedUser.data.length > 0) {
        return { ...parsedUser.data[0] };
      } else {
        return { message: 'Invalid data format', status: false };
      }
    } catch (error) {
      return { message: 'Failed to parse data', status: false };
    }
  };


  export const getLoggedInFullname = () => {
    const loginUser = localStorage.getItem('authEmployee');
  
    if (!loginUser) {
      return { message: 'No data found', status: false };
    }

    try {
      const parsedUser = JSON.parse(loginUser);
  
      if (parsedUser && parsedUser.data && parsedUser.data.length > 0) {
        // return { ...parsedUser.data[0] };
        return `${parsedUser.data[0].firstname } ${parsedUser.data[0].lastname}`
      } else {
        return { message: 'Invalid data format', status: false };
      }
    } catch (error) {
      return { message: 'Failed to parse data', status: false };
    }
  
  }


  export const logout = (navigate) => {
    const authData = localStorage.getItem('authEmployee');
    const token = localStorage.getItem('token');
  
    if (authData || token) {
      localStorage.removeItem('authEmployee');
      localStorage.removeItem('token');
      
      if (typeof navigate === 'function') {
        navigate('/login');
      } else {
        console.error('Navigate function is not defined');
      }
    } else {
      console.warn('No auth data or token found in localStorage');
    }
  };
  

  export const checkedIfLoggedIn = () => {
    const loginUser = localStorage.getItem('authEmployee');
  
    if (!loginUser) {
      return false;
    }
  
    try {
      const parsedUser = JSON.parse(loginUser);
      if(parsedUser && parsedUser.data && parsedUser.data.length > 0) {
        return { path: parsedUser.data[0].user_type , status: true}
      } else {
        return { path: '/login', status: false}
      }
    } catch (error) {
      return { path: '', status: false} ;
    }
  };
  
  
  