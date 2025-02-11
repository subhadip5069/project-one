
const fileSizeValidator = (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const fileSize = req.file.size; // File size in bytes
    const minSize = 20 * 1024; // 20 KB in bytes
    const maxSize = 200 * 1024; // 200 KB in bytes
  
    if (fileSize < minSize || fileSize > maxSize) {
      return res.status(400).json({
        message: `File size must be between 20 KB and 200 KB. Your file size: ${(fileSize / 1024).toFixed(2)} KB`,
      });
    }
  
    next();
  };
  
    module.exports = fileSizeValidator;