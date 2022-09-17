import { useEffect, useState } from 'react';
import './search.scss';

import { GitUserType } from '../../type/type';

import { GetUserinfo } from '../../provider/ApiProvider';

export const Search = () => {
    const [userInfo, SetUserInfo] = useState<GitUserType>();
    console.log(userInfo);

    useEffect(() => {
        (async () => {
            let UserData = await GetUserinfo();
            SetUserInfo(UserData);
        })()
    }, [])

    return (
        <div>
            <h1>
                Search component
            </h1>
        </div>
    )
}