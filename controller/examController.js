import Exam from '../models/Exam.js'
import { BadRequestError} from '../errors/index.js'

const createExam =  async (req,res) => {
    console.log(req.body);

    const {examTitle, questions} = req.body;
    console.log(examTitle);
    if (!examTitle || !questions) {
      throw new BadRequestError('Please Provide All Values');
    }
  
    const exam =  await Exam.create({examTitle,questions});
    res.status(201).json({ message: 'Exam created successfully' });

}

const attendExam = async (req,res) =>{
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


const getExam = async (req,res) =>{
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



export {createExam, attendExam,getExam}