import React, { useState } from 'react'
import Axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Login() {

    const [userTel, setUserTel] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [loginStatus, setLoginStatus] = useState('');


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const Signin = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/signin", {
            tel: userTel,
            password: userPwd,
        }).then((res) => {
            if (res.data.message) {
                setLoginStatus(res.data.message)
                setOpen(true)
            } else {
                console.log(res);
                setLoginStatus("Login success. id : " + res.data[0].id + " , Tel : " + res.data[0].tel);
                setOpen(true)
                localStorage.setItem('user', JSON.stringify(res.data[0]));
            }
        });
    };


    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {loginStatus}
                </Alert>
            </Snackbar>

            <Stack spacing={2} sx={{ p: 5 }}>
                <Box sx={{ textAlign: 'center' }} component='form'>
                    <h1>เข้าสู่ระบบ</h1>
                    <Box>
                        <TextField type="text" label="เบอร์โทรศัพท์" variant="standard" onChange={(e) => { setUserTel(e.target.value) }} />
                    </Box>
                    <Box>
                        <TextField type="password" label="รหัสผ่าน" variant="standard" onChange={(e) => { setUserPwd(e.target.value) }} />
                    </Box>
                    <Box>
                        <FormControlLabel
                            value="rememberMe"
                            control={<Checkbox />}
                            label="Remember me"
                            labelPlacement="end"
                        />
                    </Box>
                    <Box>
                        <Button type='submit' variant="contained" color='success' startIcon={<LoginIcon />} onClick={Signin} >
                            เข้าสู่ระบบ
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </>
    )
}

export default Login