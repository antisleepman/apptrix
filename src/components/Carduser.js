import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const Carduser = ({user}) => {
    return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {'Name: ' + user.name}
          </Typography>
          <Typography variant="h5" component="div">
            {"Login: " + user.login}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {"Type: " + user.$type}
          </Typography>
          <Typography variant="body2">
            {"Email: " + user.email}
            <br />
            {"ID: " + user.id}
          </Typography>
        </CardContent>
      </Card>
    )
}