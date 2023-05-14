import React, { useState } from 'react';
import FormRow from './../../components/FormRow';
import Wrapper from '../../assets/wrapper/createExam';
import { useAppContext } from '../../context/appContext';
let Question = {
  question: '',
  options: [],
  answer: '',
 
}

let optionObject = {
  option1: "", option2: "", option3: ""
}
const CreateExam = () => {
  const [examTitle, setExamTitle] = useState('');
  const [question, setQuestion] = useState(Question);
  const [option, setOption] = useState(optionObject)
  const { questions, setExam, setTitle, CreateExam } = useAppContext();

  console.log(option);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'examTitle':
        setTitle(value)
        setExamTitle(value);
        break;
      case 'question':
        setQuestion({ ...question, [name]: value })
      case 'answer':
        setQuestion({ ...question, [name]: value })
        break;
      case 'option1':
        setOption({ ...option, [name]: value })
        break;
      case 'option2':
        setOption({ ...option, [name]: value })
        break;

      case 'option3':
        setOption({ ...option, [name]: value })
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    let optionmatching = false;

    let options;
    for (let optionValue of Object.values(option)) {
      // Check if the option exactly matches the answer in object b
      if (optionValue === question.answer) {
        optionmatching = true
        options = {
          ...question,
          options: Object.values(option),
        };
        // Push the matching option to the options array in b

      }
    }
    if (optionmatching) {
      console.log(options);
      setExam(options);
      setQuestion(Question)
      setOption(optionObject)
    } else {
      console.log('no matchin');
    }

  }
  const createExam = () => {
    setExamTitle('');
    CreateExam()
  }

  return (
    <Wrapper>
      <h1>Create Exam</h1>
      <FormRow
        type="text"
        name="examTitle"
        value={examTitle}
        handleChange={handleChange}
        labelText="Exam Title"
      />
      <form className='form' onSubmit={handleSubmit}>


        <div className='form-center'>


          <FormRow
            type="text"
            name="question"
            value={question.question}
            handleChange={handleChange}
            labelText="Question"
          />

          <FormRow
            type="text"
            name="answer"
            value={question.answer}
            handleChange={handleChange}
            labelText="Answer"
          />
          <h2> Options</h2>
          <div className='options'>
            <div className='option-div'>
              1. <input
                type='text'
                name="option1"
                value={option.option1}
                onChange={handleChange}
              />
            </div>

            <div className='option-div'>
              2.<input
                type='text'
                name="option2"
                value={option.option2}
                onChange={handleChange}
              />
            </div>

            <div className='option-div'>
              3.<input
                type='text'
                name="option3"
                value={option.option3}
                onChange={handleChange}
              />
            </div>
            {option.option3 !== '' && option.option2 !== '' && option.option1 !== '' && examTitle !== '' && question.question !== '' && question.answer !== '' &&
              <div className='submit-question'>
                <button className='btn' type="submit" >
                  Submit Question

                </button>


              </div>

            }




          </div>

        </div>
      </form>
      {questions.length > 0 &&

        <div className='form form-center'>
          {questions.map((data) => {
            console.log(data);

            return <div className='questions'>
              <div>
                <span> Answer:</span>
                <span> {data.answer}</span>


              </div>

              <div>
                <span> Question:</span>
                <span> {data.question}</span>


              </div>
              <div>
              <span> Answer:</span>
                {
                  data.options.map((options)=>{
                    return <li key={options} >{options}</li>
                  })
                }
                </div>




            </div>


          })

          }

        </div>

      }

      {questions.length > 0 &&

        <button className='btn' onClick={createExam}>Create Eaxm</button>

      }

    </Wrapper>
  );
};

export default CreateExam;
