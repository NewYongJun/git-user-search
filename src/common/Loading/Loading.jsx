import { Box } from '@mui/material';
import LoadingOverlay from 'react-loading-overlay-ts';

import './Loading.scss';

export const Loading = () => {

    return (
        <Box className='loading-container'>
            <div className='loading-box'>
                <LoadingOverlay active={true} spinner text='Please Wait...' />
            </div>
        </Box>
    )
}