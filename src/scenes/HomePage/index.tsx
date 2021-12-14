import React from 'react';
import { Fade } from '@mui/material';
import { drawerTransitionTime } from '../../navigation';

const HomePage = React.memo(() => {
    return (
        <Fade in={true} timeout={drawerTransitionTime}>
            <div></div>
        </Fade>
    );
})

export default HomePage;