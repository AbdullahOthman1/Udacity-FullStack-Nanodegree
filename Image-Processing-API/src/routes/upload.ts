import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import logger from '../utilities/logger';

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../images/full'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only jpg, png and webp images are allowed'));
    }
  },
});

router.post(
  '/',
  upload.single('image'),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    logger.info(`Image uploaded: ${req.file.originalname}`);
    res
      .status(200)
      .json({ message: `${req.file.originalname} uploaded successfully` });
  }
);

export default router;
