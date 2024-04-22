import './App.css';
import Home from './views/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Profile } from './views/Profile';
import Upload from './views/Upload';
import Layout from './views/Layout';
import Single from './views/Single';
import Login from "./views/Login.jsx";
import Logout from "./views/Logout.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/media/:id" element={<Single />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
