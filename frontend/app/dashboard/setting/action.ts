


const UpdateUser = async (first_name: string, last_name: string, username: string, password: string) => {
  try {
    const updateData = {
      ...(first_name && { First_name: first_name }),
      ...(last_name && { Last_name: last_name }),
      ...(username && { Username: username }),
      ...(password && { Password: password }),
    };
    console.log(updateData);

    const res = await fetch("http://localhost:8000/api/auth/user/me/update/",{body: JSON.stringify(updateData) , method: 'PUT', headers: {  'Content-Type': 'application/json',}});

    return res; // Return the response data
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw error; // Re-throw the error for further handling
  }
};

export const settingAction = () => {
    return {
        UpdateUser,
      };
};