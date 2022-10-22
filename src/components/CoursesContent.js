import React, { useState, useEffect } from 'react'
import ActionCard from './ActionCard'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Axios from 'axios'


function CoursesContent() {

    const [allcourses, setAllcourses] = useState([]);


    useEffect(() => {
        Axios.get('http://localhost:3001/courses').then((res) => {
            setAllcourses(res.data);
        });
    }, []);

    return (
        <>
            <Stack>
                <Box sx={{ display: 'flex', m: 2 }}>
                    {allcourses.map((val, key) => {
                        return (
                                <Box sx={{ mx: 1}} key={key}>
                                    <ActionCard coursesName={val.courses_name} coursesDetail={val.courses_detail} />
                                </Box>
                            // <Box sx={{ mx: 2 }} key={key}>
                            //     <ActionCard coursesName={val.courses_name} coursesDetail={val.courses_detail} />
                            // </Box>
                        )
                    })}
                </Box>


            </Stack>
        </>
    )
}

export default CoursesContent