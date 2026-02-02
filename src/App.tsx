import { Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ActivityPage from './pages/ActivityPage/ActivityPage';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import CharacterCreationPage from './pages/CharacterCreationPage/CharacterCreationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ActivityModal from './components/Character/ActivityModal/ActivityModal';

function App() {

  return (
    <div id='application'>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/:username' element= {<ProfilePage/>} />
      <Route path='/characters/create' element= {<CharacterCreationPage/>} />
      <Route path='/characters/:characterId' element= {<CharacterPage/>} />
      <Route path='/activities/create' Component={ActivityModal}/>
      <Route path='/characters/:characterId/activities/:activityId' element= {<ActivityPage/>} />
      <Route path='*' element= {<NotFoundPage/>} />
    </Routes>
    </div>
  )
}

export default App
