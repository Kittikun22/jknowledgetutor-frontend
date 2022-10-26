import React from 'react';
import { useParams } from 'react-router-dom';

function CoursesContent() {

    const { courseId } = useParams();


    return (
        <>
            <h1>Courses ID : {courseId}</h1>
        </>
    )
}

export default CoursesContent