import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormRow from '../../components/FormRow';
import axios from 'axios';

const AttendExamPage = () => {
    const { id } = useParams();
    const [examData, setExamData] = useState(null);

    useEffect(() => {

        const fetchExamData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/exams/attend/${id}`);
                const data = response.data;
                setExamData(data);
            } catch (error) {
                console.error('Error fetching exam data:', error);
            }
        };

        fetchExamData();
    }, [id]);

    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [submissionResult, setSubmissionResult] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = { questionId: examData.questions[currentQuestionIndex]._id, answer: value };
        setAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < examData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the exam submission data
        const examSubmission = {
            name,
            email,
            dob,
            answers
        };

        
        axios.post(`http://localhost:4000/api/v1/exams/submit/${id}`, examSubmission, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                // Handle the response from the endpoint
                console.log('Exam submission response:', response.data);

                // Display the response in the frontend
                // Update the state or perform any necessary actions
                setSubmissionResult(response.data); // Assuming you have a state variable for storing the submission result
            })
            .catch((error) => {
                console.error('Error submitting exam:', error);
            });
    };


    return (
        <div>
            <h1>Attend Exam</h1>
            {examData ?
                <form onSubmit={handleSubmit}>

                    <FormRow
                        type="text"
                        name="name"
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                        labelText="Name"
                    />

                    <FormRow
                        type="email"
                        name="email"
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                        labelText="Email"
                    />

                    <FormRow
                        type="date"
                        name="dob"
                        value={dob}
                        handleChange={(e) => setDob(e.target.value)}
                        labelText="Date of Birth"
                    />

                    <h2>{examData.examTitle}</h2>
                    {examData.questions.map((question, index) => (
                        <div key={index}>
                            {currentQuestionIndex === index && (
                                <>
                                    <p>{question.question}</p>
                                    <FormRow
                                        type="radio"
                                        name="answer"
                                        value={question.options}
                                        handleChange={handleChange}
                                    />
                                </>
                            )}
                        </div>
                    ))}

                    {currentQuestionIndex < examData.questions.length - 1 && (
                        <button type="button" className='btn' onClick={handleNextQuestion}>
                            Next Question
                        </button>
                    )}

                    {currentQuestionIndex === examData.questions.length - 1 && (
                        <button type="submit" className='btn'>Submit</button>
                    )}


                    {submissionResult && (
                        <div>
                            <h3>Submission Result:</h3>
                            <p>Total questions: {submissionResult.totalQuestions}</p>
                            <p>Correct Answers: {submissionResult.correctAnswers}</p>
                            <p>Percentage: {submissionResult.percentage}%</p>
                        </div>
                    )}
                </form> : ""

            }
        </div>
    );
};

export default AttendExamPage;
