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

export const formatDateReadable = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

export const dateFormatted = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toISOString().split('T')[0];

    return formattedDate
}

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