import mongoose from 'mongoose';

export async function conectarBD(uri) {
  await mongoose.connect(uri);
  return mongoose.connection;
}
