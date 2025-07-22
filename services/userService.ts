import axios from "@/utils/axiosInstance";

export const getProfile = async () => {
  const res = await axios.get("/profile");
  return res.data;
};
