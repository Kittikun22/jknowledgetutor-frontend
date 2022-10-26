import React, { useState, useEffect } from 'react'
import Appbar from '../components/Appbar'
import LoadingScreen from 'react-loading-screen'
import CoursesContent from '../components/CoursesContent';
import Axios from 'axios'
import { useParams } from 'react-router-dom';

function CoursesContents() {

  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken')
    Axios.post('http://localhost:3001/authsignin', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    })
      .then((res) => {
        if (res.data.status === 'ok') {
          console.log('Valid Token');
          setLoading(false)
        } else {
          alert('Invalid Token!, Please login.')
          localStorage.removeItem('accessToken')
          window.location = '/login'
        }
      })
  }, []);

  return (
    <>
      <Appbar />
      <LoadingScreen loading={loading}
        bgColor="rgba(255,255,255,0.8)"
        spinnerColor="#478e6b"
        textColor="#676767"
        logoSrc="http://localhost:3000/static/media/Jknowledge-Logo.18250765f4f4ae91679a.webp"
        text="" />
      <CoursesContent courseId={courseId}/>
    </>
  )
}

export default CoursesContents