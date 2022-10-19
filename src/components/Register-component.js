import React, { useState } from 'react';
import Axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Register() {

    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [access_level, setAccess_level] = useState(1);

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


    const CreateUser = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/create-user', {
            tel: tel,
            password: password,
            access_level: access_level
        }).then(setOpen(true))
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Register Successfully.
                </Alert>
            </Snackbar>
            <Stack spacing={2} sx={{ p: 5 }}>
                <Box sx={{ textAlign: 'center' }} component='form'>
                    <h1>สมัครสมาชิก</h1>
                    <Box>
                        <TextField type="text" label="เบอร์โทรศัพท์" variant="standard" onChange={(e) => { setTel(e.target.value) }} />
                    </Box>
                    <Box>
                        <TextField type="password" label="รหัสผ่าน" variant="standard" onChange={(e) => { setPassword(e.target.value) }} />
                    </Box>
                    <Box>
                        <FormControlLabel
                            value="accept"
                            control={<Checkbox />}
                            label="ยอมรับข้อตกลงและเงื่อนไข"
                            labelPlacement="end"
                        />
                    </Box>
                    <Box>
                        <Button type='submit' variant="contained" color='success' startIcon={<SendIcon />} onClick={CreateUser} >
                            สมัครสมาชิก
                        </Button>
                    </Box>
                </Box>
            </Stack>

        </>
    )
}

export default Register