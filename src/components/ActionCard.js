import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function MultiActionAreaCard({coursesName, coursesDetail}) {

    return (
        <Card sx={{ maxWidth: 240, maxHeight: 360 }} elevation={2}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/images/courses_1.jpg"
                    alt={coursesName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {coursesName}
                    </Typography>
                    <Typography noWrap variant="body2" color="text.secondary" >
                        {coursesDetail}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button size="small" variant='outlined' startIcon={<AddCircleIcon />} color="primary">
                    บันทึก
                </Button>
                <Button size="small" variant='outlined' startIcon={<AddCircleIcon />} color="primary">
                    เข้าเรียน
                </Button>
            </CardActions>
        </Card>
    );
}
