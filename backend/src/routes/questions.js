

import express from 'express';
import { postQuestion, getQuestions } from '../controllers/questionsController.js';

const router = express.Router();

router.post('/', postQuestion);
router.get('/', getQuestions); 

export default router;

