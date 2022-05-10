import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import './DescriptionAlerts.css'

function DescriptionAlerts(props) {
  return (props.trigger) ?(
    <Stack sx={{ width: '100%' }} spacing={2} className='popup'>
      <Alert severity="success" className='popup-inner'>
      <button className='close-btn' onClick={()=> props.setTrigger(false)}>
                close
            </button>
        <AlertTitle>Success</AlertTitle>
        Your Offer has been added successfully  — <strong>check out your messages !</strong>
      </Alert>
      {props.children}
    </Stack>
  ): "" ;
}export default DescriptionAlerts
