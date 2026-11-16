import mongoose from 'mongoose';

const sesionSchema = new mongoose.Schema(
  {
    estudianteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    casoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Caso', required: true },
    estado: {
      type: String,
      enum: ['iniciada', 'decisionRegistrada', 'evaluada', 'errorIA', 'finalizada'],
      default: 'iniciada',
    },
    decision: {
      diagnosticoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Diagnostico' },
      justificacion: String,
      registradaEn: Date,
    },
    evaluacion: {
      resultado: { type: String, enum: ['correcto', 'parcial', 'incorrecto'] },
      retroalimentacion: String,
      evidencia: String,
      modeloIA: String,
      tiempoMs: Number,
      generadaEn: Date,
    },
    valoracion: {
      coherencia: Boolean,
      pertinencia: Boolean,
      revisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
      observaciones: String,
      valoradaEn: Date,
    },
    finalizadaEn: Date,
  },
  { timestamps: true },
);

sesionSchema.index({ estudianteId: 1, createdAt: -1 });
sesionSchema.index({ casoId: 1 });
sesionSchema.index({ estado: 1 });

export const Sesion = mongoose.model('Sesion', sesionSchema);
