import mongoose from 'mongoose';

const casoSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    historiaClinica: {
      motivoConsulta: String,
      antecedentes: String,
      descripcion: { type: String, required: true },
      edadRango: String, // desidentificado: rangos, no edades exactas
      sexo: String,
    },
    imagenes: [{ url: { type: String, required: true }, descripcion: String, orden: Number }],
    diagnosticoRefId: { type: mongoose.Schema.Types.ObjectId, ref: 'Diagnostico', required: true },
    dificultad: { type: String, enum: ['baja', 'media', 'alta'], default: 'media' },
    fuente: { nombre: { type: String, required: true }, licencia: { type: String, required: true }, url: String },
    estadoRevision: { type: String, enum: ['pendiente', 'revisado', 'rechazado'], default: 'pendiente' },
    revisadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    fechaRevision: Date,
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
);

casoSchema.index({ estadoRevision: 1, activo: 1, dificultad: 1 });

export const Caso = mongoose.model('Caso', casoSchema);
