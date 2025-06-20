import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Job Portal</h1>
        <Routes>
          <Route exact path="/" element={<JobList />} />
          <Route path="/add" element={<JobForm />} />
          <Route path="/edit/:id" element={<JobForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;