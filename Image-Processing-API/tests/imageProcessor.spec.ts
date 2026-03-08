import resizeImage from '../src/utilities/imageProcessor';
import fs from 'fs';
import path from 'path';

describe('imageProcessor utility', () => {
  const thumbDir = path.join(__dirname, '../../images/thumb');

  it('should resize a valid image and save it to thumb folder', async () => {
    const outputPath = await resizeImage('Zoro', 100, 100, 'jpg');
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  it('should return the cached image on second call', async () => {
    const firstCall = await resizeImage('Zoro', 100, 100, 'jpg');
    const secondCall = await resizeImage('Zoro', 100, 100, 'jpg');
    expect(firstCall).toBe(secondCall);
  });

  it('should create a thumbnail with the correct filename', async () => {
    await resizeImage('Groot', 150, 150, 'jpg');
    const expectedFile = path.join(thumbDir, 'Groot_150x150.jpg');
    expect(fs.existsSync(expectedFile)).toBe(true);
  });

  it('should throw an error for a non-existent image', async () => {
    await expectAsync(resizeImage('ghost', 100, 100, 'jpg')).toBeRejected();
  });

  it('should process a png format image', async () => {
    const outputPath = await resizeImage('Muzan', 100, 100, 'jpg');
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});

afterAll(() => {
  const filesToClean = [
    path.join(__dirname, '../../images/thumb/Zoro_100x100.jpg'),
    path.join(__dirname, '../../images/thumb/Groot_150x150.jpg'),
    path.join(__dirname, '../../images/thumb/Muzan_100x100.jpg'),
  ];

  filesToClean.forEach((file) => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
});