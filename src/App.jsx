import MakeUpApp from './MakeUpApp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NewPage from './NewPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<MakeUpApp />} />;
        <Route path='/new-page'  element = {<NewPage/>}  />
      </Routes>
    </Router>
  )
}

export default App
