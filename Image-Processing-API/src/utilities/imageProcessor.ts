import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import logger from './logger';

const fullDir = path.join(__dirname, '../../../images/full');
const thumbDir = path.join(__dirname, '../../../images/thumb');

const resizeImage = async (
  filename: string,
  width: number,
  height: number,
  format: 'jpg' | 'png' | 'webp' = 'jpg'
): Promise<string> => {
  const inputPath = path.join(fullDir, `${filename}.${format}`);
  const outputFilename = `${filename}_${width}x${height}.${format}`;
  const outputPath = path.join(thumbDir, outputFilename);

  if (!fs.existsSync(inputPath)) {
    logger.error(`Image not found: ${inputPath}`);
    throw new Error(`Image not found: ${filename}.${format}`);
  }

  if (fs.existsSync(outputPath)) {
    logger.info(`Cache hit: serving existing thumbnail ${outputFilename}`);
    return outputPath;
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);
  logger.info(`Processed and cached: ${outputFilename}`);
  return outputPath;
};

export default resizeImage;
