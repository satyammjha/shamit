import './App.css'
import { Routes, Route } from 'react-router-dom';
import StudentList from './Pages/StudentList';
import Inquiries from './Pages/Inquiries';
import InquiryList from './Pages/InquiryList';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/inquiryForm" element={<Inquiries />} />
        <Route path="/inquiryList" element={<InquiryList />} />
      </Routes>
    </>
  )
}

export default App;