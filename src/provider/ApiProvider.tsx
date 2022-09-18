import { Octokit } from "@octokit/rest";

export const GetUserinfo = async (username: string) => {
    const octokit = new Octokit({
        auth: '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'
    })

    try {
        let userInfo = await octokit.request('GET /users/{username}', {
            username: username
        })

        return { status: true, data: userInfo.data, message: '' };
    } catch (error) {
        return { status: false, message: `${username} user not found` };
    }


}