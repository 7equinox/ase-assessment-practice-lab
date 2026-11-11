import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base path ensures GitHub Pages subpath compatibility
export default defineConfig({
  plugins: [react()],
  base: './',
});