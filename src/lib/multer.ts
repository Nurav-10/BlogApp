import multer from "multer";
import { NextApiRequest } from "next";
import { Readable } from "stream";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

// Middleware wrapper for Multer
export function runMiddleware(req: NextApiRequest, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, {} as any, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default upload;