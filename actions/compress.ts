"use server";

import sharp from "sharp";
import axios from "axios";
import fs from "fs";

export const compressImage = async (imageUrl: string) => {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
   
    const compressedBuffer = await sharp(buffer).resize(300, 300).jpeg({ quality: 80 }).toBuffer();
    fs.writeFileSync('hello.jpg', compressedBuffer);
    return compressedBuffer;
}