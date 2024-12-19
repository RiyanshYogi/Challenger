import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Challenger from './Challenge';


const App = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Challenger />} />
          </Routes>
        </Router>
    </>
  )
}


export default App;