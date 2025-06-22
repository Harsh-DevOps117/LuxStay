import axios from "axios";

const fetchCurrentUser = async () => {
  try {
    const res = await axios.get("/me", { withCredentials: true });
    return res.data.user;
  } catch (err) {
    return null;
  }
};
