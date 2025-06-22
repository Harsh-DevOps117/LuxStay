import api from "./axios";

const signupUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/signup", { fullName, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default signupUser;
