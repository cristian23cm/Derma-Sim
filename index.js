export const config = {
  puerto: Number(process.env.PORT) || 3000,
  mongodbUri: process.env.MONGODB_URI || '',
  tutor: {
    proveedor: process.env.TUTOR_PROVEEDOR || 'simulado', // 'simulado' | 'real'
    retro: process.env.TUTOR_RETRO || 'explicable', // 'explicable' | 'breve'
    urlIA: process.env.IA_URL || '',
    claveIA: process.env.IA_CLAVE || '',
  },
};
