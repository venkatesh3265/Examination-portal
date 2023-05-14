import express from 'express';
import { createExam,attendExam,getExam } from '../controller/examController.js';

const router = express.Router();

router.route('/exams').post(createExam);
router.route('/exams/attend/:examId').get(attendExam);
router.route('/exams').get(getExam);

export default router
