import axios from "axios";

const XANO_BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:KCRiHHmr";  // ✅ Use your actual Xano API URL

export const registerDonor = async (donorData) => {
  try {
    const response = await axios.post(`${XANO_BASE_URL}/donation`, donorData);  // ✅ Correct endpoint
    return response.data;
  } catch (error) {
    console.error("Error registering donor:", error.response ? error.response.data : error.message);
    throw error;
  }
};
