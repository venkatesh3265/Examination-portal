import Exam from '../models/Exam.js';
import ExamResult from '../models/ExamResult.js'
import { BadRequestError } from '../errors/index.js'

const createExam = async (req, res) => {
  console.log(req.body);

  const { examTitle, questions } = req.body;
  console.log(examTitle);
  if (!examTitle || !questions) {
    throw new BadRequestError('Please Provide All Values');
  }

  const exam = await Exam.create({ examTitle, questions });
  res.status(201).json({ message: 'Exam created successfully' });

}

const attendExam = async (req, res) => {
  const { examId } = req.params;


  Exam.findById(examId)
    .then(exam => {
      if (!exam) {
        // Exam not found
        res.status(404).json({ error: 'Exam not found' });
      } else {
        // Exam found, send it to the client
        res.status(200).json(exam);
      }
    })
    .catch(error => {
      // Error occurred while retrieving the exam
      res.status(500).json({ error: 'Failed to retrieve exam' });
    });


}


const getExam = async (req, res) => {
  // Retrieve all exams from the database
  Exam.find({}, '_id examTitle')
    .then(exams => {
      if (exams.length === 0) {
        // No exams found
        res.status(404).json({ error: 'No exams found' });
      } else {
        // Send the exam IDs and titles to the client
        res.status(200).json(exams);
      }
    })
    .catch(error => {
      // Error occurred while retrieving the exams
      res.status(500).json({ error: 'Failed to retrieve exams' });
    });

}



const calculateResults = (examData, answers) => {
  const totalQuestions = examData.questions.length;
  let correctAnswers = 0;

  // Iterate over the answers and check if they match the correct answer in the exam data
  answers.forEach((answer, index) => {
    const question = examData.questions[index];
    if (answer.answer == question.answer) {
      console.log('test');
      correctAnswers++;
    }
  });

  const percentage = (correctAnswers / totalQuestions) * 100;

  return {
    totalQuestions,
    correctAnswers,
    percentage,
  };
};

const submitExam = async (req, res) => {
  const { examId } = req.params;
  console.log(req.body);
  const { answers, name, email, dob } = req.body;
  console.log(answers);

  try {
    // Retrieve the exam from the database
    const exam = await Exam.findById(examId);
    console.log(exam);
    if (!exam) {
      // Exam not found
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Calculate the results
    const results = calculateResults(exam, answers);
    console.log(results);
    const saveResult = {
      examId: examId,
      name: name,
      email: email,
      title: exam.examTitle,
      totalQuestions: results.totalQuestions,
      correctAnswers: results.correctAnswers,
      percentage: results.percentage

    };
    console.log(results);

    // // Create a new ExamResult document
    const examResult = new ExamResult(saveResult);

    // // Save the examResult to the database
    await examResult.save();


    return res.status(200).json(results);
  } catch (error) {
    // Error occurred while retrieving or calculating the exam results
    console.error('Failed to submit exam:', error);
    return res.status(500).json({ error: 'Failed to submit exam' });
  }
};

// Get paginated exam list
const getExamList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    // Get the total count of exams
    const totalCount = await Exam.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / limit);

    // Validate the page number
    if (page < 1 || page > totalPages) {
      throw new BadRequestError('Invalid page number');
    }

    // Get the exams with pagination
    const exams = await Exam.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    // Prepare the modified exam list with additional properties
    const examList = await Promise.all(
      exams.map(async (exam) => {
        const examId = exam._id;
        const totalQuestions = exam.questions.length;

        // Get the total count of attendees for the exam
        const totalAttendees = await ExamResult.countDocuments({ examId });

        return {
          title: exam.examTitle,
          totalQuestions,
          totalAttendees,
        };
      })
    );

    res.status(200).json({ totalPages, examList });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve exam list' });
  }
};






export { createExam, attendExam, getExam, submitExam,getExamList }