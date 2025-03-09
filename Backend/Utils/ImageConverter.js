import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

// Use memory storage to get the file as a buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to convert PNG to JPEG
const convertImage = async (req, res, next) => {
    if (!req.file) return next();

    // Define the new file name and path
    const filename = `image-${Date.now()}.jpeg`;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadDir = path.join(__dirname, "../uploads");
    const outputPath = path.join(uploadDir, filename);

    try {
        // Convert PNG to JPEG and save it to disk
        await sharp(req.file.buffer)
            .jpeg({ quality: 80 }) // Convert to JPEG format with 80% quality
            .toFile(outputPath);

        // Replace file details in req
        req.file.filename = filename;
        req.file.path = outputPath;
        next();
    } catch (error) {
        console.error("Image conversion failed:", error);
        res.status(500).json({ message: "Image conversion failed" });
    }
};

export default convertImage;