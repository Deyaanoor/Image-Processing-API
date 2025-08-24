import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const fullDir = path.resolve('./images/full');
const thumbDir = path.resolve('./images/thumb');

if (!fs.existsSync(thumbDir)) {
  fs.mkdirSync(thumbDir, { recursive: true });
}

export const processImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  const inputPath = path.join(fullDir, filename);
  const outputPath = path.join(thumbDir, `${width}x${height}_${filename}`);

  if (!fs.existsSync(inputPath)) {
    throw new Error('Original image not found');
  }

  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);
  return outputPath;
};
