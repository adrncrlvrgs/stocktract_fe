const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]); // Remove the data URL prefix
    reader.onerror = (error) => reject(error);
  });
};

export default fileToBase64