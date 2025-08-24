import express from 'express';
import imagesRoute from './routes/images.js';

const app = express();
const port = 3000;

app.use('/api/images', imagesRoute);

app.get('/', (req, res) => {
  res.send('Image Processing API is running!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
