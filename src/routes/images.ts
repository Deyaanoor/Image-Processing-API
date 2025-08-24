import express, { type Request, type Response } from 'express';
import { processImage } from '../utilities/imageProcessing.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (!filename || isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    res
      .status(400)
      .send(
        'Invalid query parameters. Example: ?filename=sample.jpg&width=200&height=200',
      );
    return;
  }

  try {
    const outputPath = await processImage(filename, width, height);
    res.sendFile(outputPath);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(404).send(errorMessage);
  }
});

export default router;
