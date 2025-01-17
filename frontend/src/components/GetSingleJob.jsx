import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/authContext';
const GetSingleJob = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const {token} = useAuth();
  const getSingleData = async () => {
    try {
      const res = await axios(`http://localhost:3000/jobs/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error(error);

    }
  }
  useEffect(() => {
    getSingleData();
  }, [id])
  return (
    <>
      <h1>Job detail:</h1>
      {data ? (
        <>
          <h2>{data.company}</h2>
          <h3>{data.role}</h3>
          <h3>Skills: {data.skills.join(", ")}</h3>
          <h3>Experience: {data.experience}</h3>
          <h3>Package: {data.pay}</h3>
          <h3>Location: {data.location.join(", ")}</h3>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default GetSingleJob