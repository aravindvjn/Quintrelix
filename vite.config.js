import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  //
  base: '/auth', // Set the default base path to /myapp/
  plugins: [react()],
});
