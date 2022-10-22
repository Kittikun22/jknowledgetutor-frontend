import Axios from 'axios'
import { useState } from 'react'
import Appbar from '../components/Appbar'
import { FaUserFriends } from 'react-icons/fa'
import { GiBookmarklet } from 'react-icons/gi'
import DeleteAlertDialog from '../components/deleteAlertDialog';
import UpdateIcon from '@mui/icons-material/Update';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input'


function Dashboard() {
    const [topic, setTopic] = useState('');
    const [userList, setUserList] = useState([]);
    const [newAccess_level, setNewAccess_level] = useState(0);
    const [courseList, setCourseList] = useState([]);

    const openUser = () => {
        getUsers();
        setCourseList([]);
    }

    const openCourse = () => {
        getCourses();
        setUserList([]);
    }

    const getUsers = () => {
        Axios.get('http://localhost:3001/users').then(setTopic('รายชื่อทั้งหมด')).then((res) => {
            setUserList(res.data);
        });
    }

    const updateAccesslevel = (id) => {
        Axios.put('http://localhost:3001/update', { access_level: newAccess_level, id: id })
            .then((res) => {
                setUserList(
                    userList.map((val) => {
                        return val.id === id ? {
                            id: val.id,
                            tel: val.tel,
                            password: val.password,
                            access_level: newAccess_level
                        } : val;
                    })
                );
            });
    };


    const getCourses = () => {
        Axios.get('http://localhost:3001/courses').then(setTopic('คอร์สเรียนทั้งหมด')).then((res) => {
            setCourseList(res.data);
        });
    }


    return (
        <>
            <Appbar />
            <Stack spacing={2} direction="row" sx={{ p:2, justifyContent: 'center' }}>
                <Button variant='outlined' color="success" onClick={openUser}><FaUserFriends style={{ width: "150px", height: "150px" }} /></Button>
                <Button variant='outlined' color="success" onClick={openCourse}><GiBookmarklet style={{ width: "150px", height: "150px" }} /></Button>
            </Stack>
            <Box sx={{ textAlign: 'center' }}>
                <h1 className='text-center'>{topic}</h1>
            </Box>
            {userList.map((val, key) => {
                return (
                    <Card sx={{ minWidth: 275, m: 2, }} elevation={2} key={key}>
                        <CardContent >
                            <Typography variant="h5" component="div">
                                ID : {val.id}
                            </Typography>
                            <Typography>
                                Tel : {val.tel}
                                <br />
                                Access_level : {val.access_level}
                                <Stack direction="row" spacing={2}>
                                    <Input placeholder="Update access level" onChange={(e) => { setNewAccess_level(e.target.value).then(e.target.value="") }} />
                                    <Button variant="outlined" startIcon={<UpdateIcon />} color="warning" onClick={() => { updateAccesslevel(val.id) }}>
                                        Update
                                    </Button>
                                    <DeleteAlertDialog userid={val.id} usertel={val.tel} userList={userList} setUserList={setUserList} />
                                </Stack>
                            </Typography>
                        </CardContent>
                    </Card>

                );
            })}

            {courseList.map((val, key) => {
                return (
                    <Stack sx={{ m: 2 }}>
                        <Card sx={{ minWidth: 275, m: 2, }} elevation={2} key={key}>
                            <CardContent>
                                <Typography>
                                    <Box component='img' src={val.courses_pic} sx={{ justifyContent: 'left' }} /><br/>
                                    Course ID : {val.courses_id}<br />
                                    Course Name : {val.courses_name}<br />
                                    Access_level : {val.courses_access}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                )
            })}
        </>
    )
}

export default Dashboard