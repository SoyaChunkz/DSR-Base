export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@vit\.edu\.in$/;
  return regex.test(email);
};

// Example validatePassword function
export const validatePassword = (password) => {
    // Check if the password is at least 8 characters long, includes at least one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/; 
    return passwordRegex.test(password);
};
