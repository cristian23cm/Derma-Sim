import 'dotenv/config';
import { crearApp } from './app.js';
import { config } from './config/index.js';
import { conectarBD } from './config/db.js';

async function main() {
  if (config.mongodbUri) {
    await conectarBD(config.mongodbUri);
    console.log('MongoDB conectado');
  } else {
    console.warn('MONGODB_URI no está definida: la API inicia sin base de datos');
  }
  crearApp().listen(config.puerto, () => {
    console.log(`API de Derma-Sim en http://localhost:${config.puerto}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
