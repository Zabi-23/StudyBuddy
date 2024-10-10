

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import questionsRouter from './routes/questions.js';
import studyPlanRouter from './routes/studyPlan.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/questions', questionsRouter);
app.use('/api/study-plan', studyPlanRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


