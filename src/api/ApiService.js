// src/api/apiService.js
import axios from "axios";

// Set up the base URL for all API requests
const API_BASE_URL = " https://dummyjson.com";

// 'https://dummyjson.com/products'

// Fetch data function
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    // console.log(response.data)
    return response.data; // Return data directly
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Throw error to handle it in the component
  }
};

// Additional API methods can be added here
// export const postData = async (data) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/posts`, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error posting data:", error);
//     throw error;
//   }
// };
