import api from "./axios";

const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default loginUser;
