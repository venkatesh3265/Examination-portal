import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing';
import SharedLayout from './pages/Exams/SharedLayout';
import CreateExam from './pages/Exams/CreateExam';
import AttendExam from './pages/Exams/AttendExam';
import ExamReport from './pages/Exams/ExamReport';
function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/exam" element={<SharedLayout />}>
          <Route index element={<CreateExam />} />
          <Route path="attend" element={<AttendExam />} />
          <Route path="report" element={<ExamReport />} />
        </Route>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
