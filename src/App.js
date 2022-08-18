import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Profilespage from './Pages/Profilespage';
import RegisterPage from './Pages/RegisterPage';
import ProfileInformation from './components/ProfileInformation';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path='/profilesPage' element={<Profilespage/>}></Route>
      <Route path='/registerProfile' element={<RegisterPage/>}></Route>
      <Route path="/profileInformation/:username" element={<ProfileInformation/>}></Route>
    </Routes>
  </Router>
  );
}

export default App;


