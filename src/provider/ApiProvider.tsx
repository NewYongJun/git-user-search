import { Octokit } from "@octokit/rest";

export const GetUserinfo = async () => {
    const octokit = new Octokit({
        auth: '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'
    })

    let userInfo = await octokit.request('GET /users/{username}', {
        username: 'bradtraversy'
    })

    return userInfo.data;
}