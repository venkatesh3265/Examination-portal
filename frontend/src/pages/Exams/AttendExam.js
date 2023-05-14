import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext';

const AttendExam = () => {
  const { getExam,examList } = useAppContext();

  useEffect(()=>{
    getExam();
  },[])

  let renderExamList = examList.length >0 ?

  examList.map((item)=>{
  return <form className='form'>
    <h1>{item.examTitle}</h1>
    <button className='btn'>Attend Exam </button>

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