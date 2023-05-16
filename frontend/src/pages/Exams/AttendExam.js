import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext';
import { useNavigate  } from 'react-router-dom';

const AttendExam = () => {
  const { getExam,examList } = useAppContext();
  const navigate  = useNavigate();

  useEffect(()=>{
    getExam();
  },[])

  const attendExam = (id) =>{

    navigate(`/exam/attend/${id}`);

  }

  let renderExamList = examList.length >0 ?

  examList.map((item)=>{
  return <form className='form'>
    <h1>{item.examTitle}</h1>
    <button className='btn' onClick={(e)=>{e.preventDefault();attendExam(item._id)}}>Attend Exam </button>

   </form>
    
  })


  :'No data found'
  return (
    <div>
      {renderExamList}
    </div>
  )
}

export default AttendExam