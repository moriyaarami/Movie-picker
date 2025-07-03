import { Route, Routes } from 'react-router-dom';
import './App.css'
import './style/favorite.css'
import Favorite from './components/favorites';
import Home from './components/home';

function App() {

  return <>

    <div className="container">

      <Routes>
        <Route path={'/favorites'} element={<Favorite />} />
        <Route path={'/'} element={<Home />} />
      </Routes>

    </div >

  </>
}

export default App
