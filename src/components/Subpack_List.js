import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';



export default function Subpack_List() {
    const packageList = [
        {
            id: 1,
            name: 'Package 3 Month. 1,500 BATH',
            detail: 'แพ็คเกจคอร์สเรียนออนไลน์ 3 เดือน สามารถเข้าเรียนได้ทุกเนื้อหาทุกรายวิชาได้อย่างไม่จำเป็นภายในระยะเวลา 3 เดือนเต็ม',
            amount: 1500
        },
        {
            id: 2,
            name: 'Package 6 Month. 2,500 BATH',
            detail: 'แพ็คเกจคอร์สเรียนออนไลน์ 6 เดือน สามารถเข้าเรียนได้ทุกเนื้อหาทุกรายวิชาได้อย่างไม่จำเป็นภายในระยะเวลา 6 เดือนเต็ม',
            amount: 2500
        }
    ];
    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                mt={5}>
                {packageList.map((val, key) => {
                    return (
                        <Card sx={{ maxWidth: 200 }} key={key}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/courses_1.jpg"
                                    alt="course_1"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {val.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {val.detail}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="medium" color="primary">
                                    สมัครแพ็คเกจ
                                </Button>
                            </CardActions>
                        </Card>
                    )
                })}

            </Stack>

        </>
    );
}