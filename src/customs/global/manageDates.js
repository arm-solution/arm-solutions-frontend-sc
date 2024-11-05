export const getCurrentDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const formatDateAndTimeReadable = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila', // Replace with your desired timezone
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).format(date);
};


export const formatDateReadable = (isoDate) => {
    // Create a Date object from the date string, ignoring the time part
    const date = new Date(isoDate.split('T')[0]);  // Split to remove the time part
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export const dateFormatted = (isoDate) => {
    const date = new Date(isoDate);
    
    // Format the date to your local time zone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};


export const formatDateTime = (dateTimeStr) => {
    // Remove 'T' and 'Z'
    if(dateTimeStr) {
        let formattedStr = dateTimeStr.replace('T', ' ').replace('Z', '');
    
        // Optional: If you want to further format the date and time
        let date = new Date(formattedStr);
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
        let year = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');
    
        // Format as 'YYYY-MM-DD HH:MM:SS'
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return;
}

export const formatDateToString = (dateString) => {
    const date = new Date(dateString);
  
    // Get the month, day, and year from the Date object
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
    // Format the date to 'September 12, 2024'
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const formatDateToStringv2 = (dateString) => {
    if (!dateString || typeof dateString !== 'string') {
        console.error("Invalid date string");
        return null; // Or handle the error as you see fit
      }
    
      // Ensure proper format: replacing space with 'T' for ISO string compatibility
      const formattedDateString = dateString.replace(" ", "T");
    
      const date = new Date(formattedDateString);
    
      if (isNaN(date)) {
        console.error("Invalid date format");
        return null;
      }
    
      // Define options for formatting the date to 'September 14, 2024'
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
      // Use Intl.DateTimeFormat to format the date
      return new Intl.DateTimeFormat('en-US', options).format(date);
  }

 export const getCurrentDateForCalculation = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

 export const calculateHours = (date, timeIn, timeOut) => {
    // Parse the date and times into Date objects
    const inDate = new Date(`${date} ${timeIn}`);
    const outDate = new Date(`${date} ${timeOut}`);
    
    // Calculate the difference in milliseconds
    const diffMs = outDate - inDate;
    
    // Convert milliseconds to hours and minutes
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours} hours and ${minutes} minutes`;
}

export const calculateDecimalHours = (date, timeIn, timeOut) => {
    // Parse the date and times into Date objects
    const inDate = new Date(`${date} ${timeIn}`);
    const outDate = new Date(`${date} ${timeOut}`);
    
    // Calculate the difference in milliseconds
    const diffMs = outDate - inDate;

    // Ensure difference is non-negative
    if (diffMs <= 0) return 0;
    
    // Convert milliseconds to total hours as a float with decimal minutes
    const totalMinutes = diffMs / (1000 * 60);
    const totalHours = totalMinutes / 60;

    return parseFloat(totalHours.toFixed(2));
}

export const getWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    
    const weekDates = [];
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + mondayOffset + i);
  
      // Format the date to YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];
      weekDates.push(formattedDate);
    }
  
    return weekDates;
  }

  export const getWeekStartAndEnd = (inputDate) => {
    const date = new Date(inputDate);
    const dayOfWeek = date.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    
    // Calculate the Monday and Sunday dates
    const mondayDate = new Date(date);
    mondayDate.setDate(date.getDate() + mondayOffset);
    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6);
  
    // Format the dates to YYYY-MM-DD
    const formattedMonday = mondayDate.toISOString().split('T')[0];
    const formattedSunday = sundayDate.toISOString().split('T')[0];
  
    return { start: formattedMonday, end: formattedSunday };
  }
  