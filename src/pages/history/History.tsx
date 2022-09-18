import { Fragment, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import './history.scss';

import { HistoryState, AppDispatch } from '../../store/type/type';
import { GitUserType } from '../../type/type';

import { SaveHistory } from '../../store/actions/actionCreators';

export const History = () => {
    const dispatch: AppDispatch = useDispatch();
    const history: GitUserType[] = useSelector((state: HistoryState) => state.history);

    const gotoHistory: any = useRef();
    const userClick = (userInfo: GitUserType) => {
        dispatch(SaveHistory(userInfo, userInfo.login));
    }

    const [isFirstLoad, SetFirstLoad] = useState(true);
    useEffect(() => {
        isFirstLoad ? SetFirstLoad(false) : gotoHistory.current.click();
    }, [history])

    return (
        <Container maxWidth="lg" className='history-container'>
            <Box sx={{ border: '1px solid grey' }} className='history-section'>
                <Box className='search-link'><Link to={`search`} ref={gotoHistory}><KeyboardBackspaceIcon /> <p>Search</p></Link></Box>

                <Box className='history-box'>
                    {
                        history.length ?
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {
                                    history.map((item, index) => {
                                        return (
                                            <Box key={index}>
                                                <ListItem alignItems="flex-start" onClick={() => { userClick(item) }} style={{ cursor: 'pointer' }}>
                                                    <ListItemAvatar>
                                                        <Avatar alt={item.name ? item.name : item.login} src={item.avatar_url} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={`Name : ${item.name ? item.name : item.login}`}
                                                        secondary={
                                                            <Fragment>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >
                                                                    Description :
                                                                </Typography>
                                                                {` ${item.bio ? item.bio : ''}`}
                                                            </Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </Box>
                                        )
                                    })
                                }
                            </List> : 'No history.'
                    }
                </Box>
            </Box>
        </Container >
    )
}