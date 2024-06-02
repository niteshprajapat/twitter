const USER_API_BASE_URL = 'http://127.0.0.1:5000/api/v1/users';
const TWEET_API_BASE_URL = 'http://127.0.0.1:5000/api/v1/tweet';


export const UserPath = {
    register: `${USER_API_BASE_URL}/register`,
    login: `${USER_API_BASE_URL}/login`,
    myProfile: `${USER_API_BASE_URL}/profile`,   // http://127.0.0.1:5000/api/v1/users/profile/66519bc125966f26ddac6f9e
    otherUsers: `${USER_API_BASE_URL}/other-users`,
}

export const TweetPath = {

}