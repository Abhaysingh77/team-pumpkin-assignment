export const formatTime = (isoString, use24HourFormat = false) => {
    const date = new Date(isoString);
    
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !use24HourFormat, // `false` for 24-hour format
    };
  
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  