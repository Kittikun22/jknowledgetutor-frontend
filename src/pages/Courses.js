import React, { useEffect } from 'react'
import Appbar from '../components/Appbar'
import CoursesContent from '../components/CoursesContent'
import Axios from 'axios'

function Courses() {

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    console.log('Bearer ' + accessToken);
    Axios.post('http://localhost:3001/authsignin', {
      token: accessToken,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === 'ok') {
          alert('authen Success')
        } else {

        }
      })
  }, [])


  return (
    <>
      <Appbar />
      <CoursesContent />
    </>

  )
}

export default Courses