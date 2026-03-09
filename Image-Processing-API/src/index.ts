import fs from 'fs';
import express from 'express';
import path from 'path';
import imageRouter from './routes/images';
import uploadRouter from './routes/upload';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../src/frontend')));
app.use('/thumbnails', express.static(path.join(__dirname, '../../images/thumb')));

app.use('/api/images', imageRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/thumbnails', (req, res) => {
  const thumbPath = path.join(__dirname, '../../images/thumb');
  const files = fs.readdirSync(thumbPath);
  res.json({ thumbnails: files });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
