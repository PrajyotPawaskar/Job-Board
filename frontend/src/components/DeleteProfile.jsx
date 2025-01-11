import axios from 'axios'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DeleteProfile = () => {
  const { token } = useAuth();
  const handleDelete = async () => {
    try {
      const res = await axios.delete('http://localhost:3000/profile/delete',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast.success("Profile Deleted Successfully");
    } catch (error) {
      toast.error("Error deleting profile");
    }
  }
  return (
    <div>
      <h1>Delete Profile</h1>
      <p>Are you sure you want to delete your profile?</p>
      <button onClick={handleDelete}>Delete Profile</button>
      <ToastContainer />
    </div>
  )
}

export default DeleteProfile