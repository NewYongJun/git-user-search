import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { Loading } from '../../common/Loading/Loading';

import { GitUserType } from '../../type/type';
import { HistoryState, AppDispatch } from '../../store/type/type';

import './search.scss';

import { GetUserinfo } from '../../provider/ApiProvider';

import { SaveHistory } from '../../store/actions/actionCreators';

const userKeys = ['bio', 'email', 'url', 'followers', 'public_repos', 'repos_url', 'type'];
export const Search = () => {
    const dispatch: AppDispatch = useDispatch();
    const searchName: string = useSelector((state: HistoryState) => state.searchName);

    const [IsLoading, SetIsLoading] = useState<boolean>(false);

    const [userInfo, SetUserInfo] = useState<GitUserType>();
    const [User_Name, SetUserName] = useState<string>('');
    const [ErrMsg, SetErrMsg] = useState<{ status: Boolean, message: String }>({ status: false, message: '' })

    const SearchClick = async () => {
        if (User_Name) GetUserInfoFunc(User_Name);
    }

    const GetUserInfoFunc = async (name: string) => {
        SetIsLoading(true);
        let UserData = await GetUserinfo(name);

        if (UserData.status) {
            SetUserInfo(UserData.data);
            SetErrMsg({ status: false, message: '' });
        } else SetErrMsg({ status: true, message: UserData.message });
        SetIsLoading(false);
    }

    const [FirstLoad, SetFirstLoad] = useState(true);
    useEffect(() => {
        if (FirstLoad) {
            if (searchName) GetUserInfoFunc(searchName);
            SetFirstLoad(false);
        } else if (userInfo) dispatch(SaveHistory(userInfo, User_Name ? User_Name : searchName));
    }, [userInfo])

    return (
        <Container maxWidth="lg">
            <Box sx={{ border: '1px solid grey' }} className='search-container'>
                <Box className='history-link'><Link to={`history`}><KeyboardBackspaceIcon /><p> history</p></Link></Box>

                <Grid container rowSpacing={3} className='search-grid'>
                    <Grid item xs={12} sx={{ mb: '50px' }}>
                        <Box>
                            <Grid container rowSpacing={1}>
                                <Grid item xs={12} sm={8} md={10} lg={10} >
                                    <Box>
                                        <TextField sx={{ width: '100%' }}
                                            label="Search field"
                                            type="search"
                                            variant="standard"
                                            value={User_Name}
                                            onChange={(e) => { SetUserName(e.target.value) }}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={4} md={2} lg={2} >
                                    <Box sx={{ height: '100%' }}>
                                        <Button variant="contained" sx={{ width: '100%', height: '100%' }} onClick={SearchClick}>
                                            Search
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box>
                            {
                                ErrMsg.status ? ErrMsg.message : userInfo ?
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={5} lg={4}>
                                            <Box sx={{ height: '100%', width: '100%' }} className='left-container'>
                                                <img src={userInfo.avatar_url} alt={userInfo.name ? userInfo.name : ''} className='user-avatar' />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={7} lg={8}>
                                            <Box className='right-container'>
                                                <Box sx={{ width: 'fit-content', maxWidth: '80%' }}>
                                                    {
                                                        userKeys.map((item, index) => {
                                                            return (
                                                                <Box className='userText-contain' key={index}>
                                                                    <Typography variant="h6" component="h5">{item} :</Typography>
                                                                    <Typography variant="h6" component="h6">{userInfo[item]}</Typography>
                                                                </Box>
                                                            )
                                                        })
                                                    }
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid> : ''
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {
                IsLoading ? <Loading /> : ''
            }
        </Container>
    )
}