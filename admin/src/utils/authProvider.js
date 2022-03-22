const baseUrl = 'http://localhost:5000';

const authProvider = {
    login: (userData) =>  {
        const request = new Request(`${baseUrl}/auth/login`, {
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
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    checkAuth: () => {
        return Promise.resolve();
    },
    getPermissions: () => {
        // Required for the authentication to work
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    }
    // ...
};

export default authProvider;