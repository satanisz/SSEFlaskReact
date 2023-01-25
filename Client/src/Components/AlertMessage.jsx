import React from 'react';
import Alert from '@mui/material/Alert';
import './style.css'

function AlertMessage(props) {
    return (
        <Alert className="alert-message" severity="error" >{props.message}</Alert>
    );
}

export default AlertMessage;