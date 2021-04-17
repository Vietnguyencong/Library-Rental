
// const apiUrl = 'https://uhlib.cc/api';
const apiUrl = 'http://localhost:5000/api';
export default {
    // called when the user attempts to log in
    login: async ({ username, password }) => {
        const res = await fetch (`${apiUrl}/aut/login`, {
            method:"POST",
            headers :{
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(
                {
                    "email": username, 
                    "password": password
                }
            )
        })  
        const {access_token} = await res.json()
        if (access_token) {
            localStorage.setItem('access_token', JSON.stringify({
                login:true, 
                fullname: username,
                token: access_token
            }));
            return Promise.resolve();

        }else{
            return Promise.reject({message:false})
        }
    },
    // called when the user clicks on the logout button
    logout: () => {
        if (localStorage.getItem("access_token"))
            localStorage.removeItem('access_token');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            if (localStorage.getItem("access_token"))
                localStorage.removeItem('access_token');
            return Promise.reject({message:"wrong pass or wrong email"});
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('access_token')
            ? Promise.resolve()
            : Promise.reject({message: "wrong pass"});
    },

    // get identity of user 
    getIdentity: () => {
        try {
            const { fullname } = JSON.parse(localStorage.getItem('access_token'));
            return Promise.resolve({ fullname });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};