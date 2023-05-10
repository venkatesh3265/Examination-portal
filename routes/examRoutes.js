import express from 'express';
import { createExam } from '../controller/examController.js';

const router = express.Router();

router.route('/exams').post(createExam);

export default router
