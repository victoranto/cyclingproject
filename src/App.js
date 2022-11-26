import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';


import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Activity from './components/Activity';
import MapSegments from './components/MapSegments';
import StravaRedirect from './components/StravaRedirect';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/redirect" element={<StravaRedirect />} />
          <Route path="/activity/:id" element={<Activity />} />
          <Route path="/map" element={<MapSegments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;