import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");
// Middleware to process and convert image to JPEG
const convertToJpeg = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newFilename = `${uniqueSuffix}.jpeg`;
        const outputPath = path.join(uploadDir, newFilename);

        await sharp(req.file.buffer)
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toFile(outputPath);

        req.file.filename = newFilename; // Override filename
        req.file.path = outputPath;
        next();
    } catch (err) {
        next(err);
    }
};

export default convertToJpeg;
