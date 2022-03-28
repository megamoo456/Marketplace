const baseUrl = 'http://localhost:5000';

const authProvider = {
    login: (userData) =>  {
        const request = new Request(`${baseUrl}/auth/loginadmin`, {
            method: 'POST',
            body: JSON.stringify(userData),
            credentials: 'include',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json(); 
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
            })

            .catch(() => {
                throw new Error('Network error')
            });
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject({ message: false });
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },

    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    }, 
    getPermissions: () => {
        // Required for the authentication to work
        return Promise.resolve();
    },

    // ...
};

export default authProvider;