import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../context/authContext'
const GetProfile = () => {
  const [data, setData] = useState()
  const { token } = useAuth();
  const getProfileInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/profile/getinfo',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      setData(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getProfileInfo();
  }, [])
  return (
    <>
      <h1>Your Profile</h1>
      <div>
        <h2>{data && data.name}</h2>
        <h3>{data && data.email}</h3>
        <h3>{data && data.phone}</h3>
        <h3>{data && data.education}</h3>
        <h3>{data && data.skills}</h3>
        <h3>{data && data.experience}</h3>
        <h3>{data && data.location}</h3>
      </div>
    </>
  )
}

export default GetProfile