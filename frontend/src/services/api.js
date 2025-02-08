import axios from "axios";

const API_URL = "http://localhost:5000/api/FileUpload/upload";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const pdfToText = async (fileId) => {
  return await axios.get(
    `http://localhost:5000/api/File/extract-text/${fileId}`
  );
};
