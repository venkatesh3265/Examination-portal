import express from 'express';
import { createExam,attendExam,getExam, submitExam,getExamList } from '../controller/examController.js';

const router = express.Router();

router.route('/exams').post(createExam);
router.route('/exams/attend/:examId').get(attendExam);
router.route('/exams').get(getExam);
router.route('/exams/submit/:examId').post(submitExam);
router.route('/exams/result').get(getExamList);

export default router
