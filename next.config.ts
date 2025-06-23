import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    serverActions:{
      bodySizeLimit:'2mb'
    }
  }
  ,images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'images.unsplash.com'
      },
      {
        protocol:'https',
        hostname:'unsplash.com'
      },
      {
        protocol:'https',
        hostname:'plus.unsplash.com'
      },
      {
        protocol:'https',
        hostname:'res.cloudinary.com'
      },
      {
        protocol:'https',
        hostname:'img.freepik.com'
      }
    ]
  }
};

export default nextConfig;
