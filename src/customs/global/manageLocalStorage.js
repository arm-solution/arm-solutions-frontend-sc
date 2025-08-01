export const checkAuthAndNavigate = (navigate) => {
    
    const authData = localStorage.getItem('authEmployee');
    const token = localStorage.getItem('token');
    
    if (authData) {
      const { data } = JSON.parse(authData);
      const role = data.length > 0 ? data[0].department : null; // Assuming data is an array with role inside


      console.log("my role", data[0]);
  
      if (role === 1) {
        navigate('/admin');
      } else if (role === 10) {
        navigate('/production');
      } else if (role === 8) {
        navigate('/marketing');
      } else if (role === 6) {
        navigate('/engineering');
      } else if (role === 5) {
        navigate('/warehouse');
      } else if (role === 7) {
        navigate('/purchasing');
      } else if (role === 9) {
        navigate('/sales');
      } else if (role === 4) {
        navigate('/finance');
      } else if (role === 3) {
        navigate('/accounting');
      } else if (role === 2) {
        navigate('/hr');
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
        navigate('/');
        sessionStorage.clear();
        window.dispatchEvent(new Event('currentShift'));
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
        return { path: parsedUser.data[0].department_name , status: true}
      } else {
        return { path: '/login', status: false}
      }
    } catch (error) {
      return { path: '', status: false} ;
    }
  };

  export const getToken = () => {
    try {
      const tokenString = localStorage.getItem('token');
      
      if (!tokenString) {
          throw new Error('No token found');
      }

      const token = tokenString.replace(/^"(.*)"$/, '$1');

      return token;
    } catch (error) {
      console.log("Error getting the token")
    }
  }

  export const getLoggedInID = () => {
    const loginUser = localStorage.getItem('authEmployee');
  
    if (!loginUser) {
      return { message: 'No ID found', status: false };
    }
  
    try {
      const parsedUser = JSON.parse(loginUser);
  
      if (parsedUser && parsedUser.data && parsedUser.data.length > 0) {
        return parsedUser.data[0].id;
      } else {
        return { message: 'Invalid data format', status: false };
      }
    } catch (error) {
      return { message: 'Failed to parse data', status: false };
    }
  }

  export const getLoggedInData = () => {
    const loginUser = localStorage.getItem('authEmployee');
  
    if (!loginUser) {
      return null;
    }
  
    try {
      const parsedUser = JSON.parse(loginUser);
  
      // Checking for valid data structure with data array
      if (parsedUser?.data && Array.isArray(parsedUser.data) && parsedUser.data.length > 0) {
        return parsedUser.data[0];
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  };

// Get the logged-in user's department ID
export const getDepartmentLoggedIn = () => {
  try {
    const loginUser = localStorage.getItem('authEmployee');
    if (!loginUser) return null;

    const parsedUser = JSON.parse(loginUser);
    return parsedUser && parsedUser.data && parsedUser.data[0]
      ? parsedUser.data[0].department
      : null;
  } catch (error) {
    return null;
  }
};

// Check if the logged-in user's department is allowed
// sample parameters is department id [1,3,4]
export const isDepartmentAllowed = (allowedDepartments) => {
  const userDepartment = getDepartmentLoggedIn();

  // If no departments are specified, allow all departments
  if (!allowedDepartments || allowedDepartments.length === 0) {
    return userDepartment !== null;
  }

  return userDepartment !== null && allowedDepartments.includes(userDepartment);
};


export const getApprovalState = (status) => {
  let approver = {
    previousDepartment: 0,
    status: '',
    targetDepartment: 0
  }

  if(!getDepartmentLoggedIn()) {
    return approver;
  }
  

  if(getDepartmentLoggedIn() === 8) {
    // marketing statage
    approver.previousDepartment = getDepartmentLoggedIn()
    approver.status = "for engineering"
    approver.targetDepartment = 6
  } else if(getDepartmentLoggedIn() === 6 && status === 'for engineering') {
    // engineering stage
    approver.previousDepartment = getDepartmentLoggedIn()
    approver.status = "for warehouse"
    approver.targetDepartment = 5
  } if(getDepartmentLoggedIn() === 5) {
    // warehouse stage
    approver.previousDepartment = getDepartmentLoggedIn()
    approver.status = "for purchasing"
    approver.targetDepartment = 7
  } if(getDepartmentLoggedIn() === 7) {
    // purchasing stage
    approver.previousDepartment = getDepartmentLoggedIn()
    approver.status = "for accounting"
    approver.targetDepartment = 3
  } if(getDepartmentLoggedIn() === 3) {
    // accounting stage
    approver.previousDepartment = getDepartmentLoggedIn()
    approver.status = "for finance"
    approver.targetDepartment = 4
  } if(getDepartmentLoggedIn() === 4) {
    // finance stage
    approver.previousDepartment = getDepartmentLoggedIn()
    approver.status = "for admin"
    approver.targetDepartment = 1
  } if(getDepartmentLoggedIn() === 1) {
    // admin stage
    approver.previousDepartment = getDepartmentLoggedIn()
    approver.status = "for engineering review"
    approver.targetDepartment = 6
  }

  if(getDepartmentLoggedIn() === 6 && status === 'for engineering review') {
        // enginering review stage
        approver.previousDepartment = getDepartmentLoggedIn()
        approver.status = "for finance review"
        approver.targetDepartment = 4
  } 

  if(getDepartmentLoggedIn() === 4 && status === 'for finance review') {
    // finance review stage 
    // the final stage
    approver.previousDepartment = getDepartmentLoggedIn()
    approver.status = "completed"
    approver.targetDepartment = 0
 } 

 return approver;

}
  
  
  