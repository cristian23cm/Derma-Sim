import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
  {
    alias: { type: String, required: true, unique: true, trim: true },
    rol: { type: String, enum: ['estudiante', 'docente', 'equipo'], required: true },
    hashClave: { type: String, select: false }, // solo roles con acceso restringido
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Usuario = mongoose.model('Usuario', usuarioSchema);
