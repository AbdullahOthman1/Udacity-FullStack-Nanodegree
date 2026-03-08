import express, { Request, Response } from 'express';
import resizeImage from '../utilities/imageProcessor';
import logger from '../utilities/logger';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height, format } = req.query;

  if (!filename) {
    res.status(400).json({ error: 'filename is required' });
    return;
  }

  if (!width || !height) {
    res.status(400).json({ error: 'width and height are required' });
    return;
  }

  const parsedWidth = parseInt(width as string);
  const parsedHeight = parseInt(height as string);

  if (
    isNaN(parsedWidth) ||
    isNaN(parsedHeight) ||
    parsedWidth <= 0 ||
    parsedHeight <= 0
  ) {
    res
      .status(400)
      .json({ error: 'width and height must be positive numbers' });
    return;
  }

  const allowedFormats = ['jpg', 'png', 'webp'];
  const imageFormat = (format as string) || 'jpg';

  if (!allowedFormats.includes(imageFormat)) {
    res.status(400).json({ error: 'format must be jpg, png or webp' });
    return;
  }

  try {
    const outputPath = await resizeImage(
      filename as string,
      parsedWidth,
      parsedHeight,
      imageFormat as 'jpg' | 'png' | 'webp'
    );
    logger.info(`Serving image: ${filename} at ${parsedWidth}x${parsedHeight}`);
    res.sendFile(outputPath);
  } catch (error) {
    logger.error(`Error processing image: ${error}`);
    res.status(404).json({ error: 'Image not found' });
  }
});

export default router;
