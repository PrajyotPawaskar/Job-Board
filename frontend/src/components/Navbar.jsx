import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/signup">SignUp</Link></li>
          <li><Link to="/signin">SignIn</Link></li>
          <li><Link to="/setprofile">Set Profile</Link></li>
          <li><Link to="/getprofile">Profile</Link></li>
          <li><Link to="/updateprofile">Update Profile</Link></li>
          <li><Link to="/deleteprofile">Delete Profile</Link></li>
          <li><Link to="/getjobs">Jobs</Link></li>
          <li><Link to="/postjob">Post Job</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
