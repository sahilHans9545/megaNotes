const link = "production";
const apiUrl =
  link === "development"
    ? "http://localhost:8000"
    : "https://meganotes.onrender.com";
export default apiUrl;
