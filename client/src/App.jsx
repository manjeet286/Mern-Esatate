import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import Profile from './pages/Profile';
import Header from './Components/Header';
import PrivateRoute from './Components/privateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/EditListing';
import Listing from './pages/Listing';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search/>} />
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
