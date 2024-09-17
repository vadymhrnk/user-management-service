import axios from "axios";

const API_URL = "http://ec2-3-84-127-228.compute-1.amazonaws.com/users";

export const fetchUsers = async (page = 0, size = 5) => {
  try {
    const response = await axios.get(
      `${API_URL}?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchUsersByName = async (name, page, size) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { name, page, size },
  });
  return response.data;
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
