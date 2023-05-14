import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
    examTitle: {
      type: String,
      required: true
    },
    questions: [
      {
        question: {
          type: String,
          required: true
        },
        options: [
          {
            type: String,
            required: true
          }
        ],
        answer: {
          type: Number,
          required: true
        }
      }
    ]
  });
  
  export default mongoose.model('Exam', ExamSchema);