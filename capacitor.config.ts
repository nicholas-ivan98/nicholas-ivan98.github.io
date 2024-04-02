import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.apps.black.manga',
  appName: 'Manga Reader',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
