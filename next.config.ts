import type { NextConfig } from 'next';

export default {
  reactCompiler: true,

  allowedDevOrigins: ['192.168.1.191'],
  devIndicators: false,
} satisfies NextConfig;
