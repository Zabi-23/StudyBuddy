

import express from 'express';
import { getStudyPlan } from '../controllers/studyPlanController.js';

const router = express.Router();

router.get('/', getStudyPlan);

export default router;


