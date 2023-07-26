import axios from "axios";

const uploadTest = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/process-config-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // const data = JSON.parse(response);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default uploadTest;
