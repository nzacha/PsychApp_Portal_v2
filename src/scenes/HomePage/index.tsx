import React, { useRef } from 'react';
import { Box, Fade, Paper, useTheme } from '@mui/material';
import { drawerTransitionTime } from '../../navigation';
import Title from '../../components/common/Title';

const HomePage = React.memo(() => {
    const theme = useTheme();

    return (
        <Fade in={true} timeout={drawerTransitionTime} style={{ height: 'calc(100vh - 130px)' }}>
            <Paper
                variant={'elevation'}
                elevation={5}
                style={{ padding: '1em', margin: '1em', backgroundColor: theme.palette.grey[200] }}
            >
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} style={{ height: '100%' }}>
                    <Title title={'Welcome to PsychApp'} variant={'h2'} />
                    <Title title={'For navigation use the panel on the left-side'} variant={'h4'} />
                </Box>
            </Paper>
        </Fade>
    );
});

export default HomePage;
