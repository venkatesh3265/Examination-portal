import React, { useEffect, useState } from 'react'
import axios from 'axios';
const ExamReport = () => {
  const [examList, setExamList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/exams/result`, {
      params: {
        page: currentPage,
        limit: perPage
      }
    })
      .then((response) => {
        // Handle the response from the endpoint
        console.log('Exam list response:', response.data);

        // Update the state or perform any necessary actions
        setExamList(response.data.examList);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error('Error retrieving exam list:', error);
      });
  }, [currentPage, perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Exam List</h1>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Total Questions</th>
            <th>Total Attendees</th>
          </tr>
        </thead>
        <tbody>
          {
          examList.length >0?examList.map((exam) => (
            <tr key={exam._id}>
              <td>{exam.title}</td>
              <td>{exam.totalQuestions}</td>
              <td>{exam.totalAttendees}</td>
            </tr>
          )):"Loading....."}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExamReport