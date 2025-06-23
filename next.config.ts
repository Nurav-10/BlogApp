import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    serverActions:{
      bodySizeLimit:'2mb'
    }
  }
  ,images:{
    domains:['images.unsplash.com','unsplash.com','plus.unsplash.com','img.freepik.com','res.cloudinary.com']
  }
};

export default nextConfig;
