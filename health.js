import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ estado: 'ok', servicio: 'derma-sim-api', hora: new Date().toISOString() });
});

export default router;
