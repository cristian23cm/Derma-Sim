import mongoose from 'mongoose';

const diagnosticoSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true }, // p. ej. akiec, bcc, bkl, df, mel, nv, vasc
  nombre: { type: String, required: true },
  categoria: { type: String, enum: ['benigna', 'premaligna', 'maligna'], required: true },
});

export const Diagnostico = mongoose.model('Diagnostico', diagnosticoSchema);
