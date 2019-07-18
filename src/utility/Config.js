const Config = {
  isDev: true,
  // devApiRoute: 'http://localhost:3000/',
  devApiRoute: 'http://localhost:3000/',
  prodApiRoute: '',
  supportedPlatforms: ['twitch', 'google', 'facebook'],
  imageUpload: {
    sizeLimit: 1024000, // 1mb
    validTypes: ['image/png', 'image/jpeg'] // array of valid file upload types
  }
};

export default Config;
