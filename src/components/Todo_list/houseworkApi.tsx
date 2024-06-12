import axios from 'axios';

const API_URL = 'http://localhost:3000/houseworks';

export const getAllHouseworks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching houseworks:', error);
    throw error;
  }
};

export const createHousework = async (housework: any) => {
  try {
    const response = await axios.post(API_URL, housework);
    return response.data;
  } catch (error) {
    console.error('Error creating housework:', error);
    throw error;
  }
};

export const updateHouseworkById = async (id: number, housework: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, housework);
    return response.data;
  } catch (error) {
    console.error('Error updating housework:', error);
    throw error;
  }
};

export const deleteHouseworkById = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting housework:', error);
    throw error;
  }
};
