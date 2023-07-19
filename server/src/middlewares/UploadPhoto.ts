import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import path from 'path';
import catchAsync from '../utils/catchAsync';

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
   req.file = file;
   if (file.mimetype.startsWith('image')) {
      cb(null, true);
   } else {
      cb(null, false);
   }
};

export const resizePhoto = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
   if (!req.file) return next();

   req.file.filename = `${Date.now()}.jpeg`;

   const outputPath = path.join(__dirname, '../../../client/public', req.file.filename);

   await sharp(req.file.buffer)
      .rotate()
      .resize(500, 500)
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(outputPath);

   next();
});

export const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
