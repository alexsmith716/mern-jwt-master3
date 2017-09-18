
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
import Home from '../shared/Home.js';
import Signup from '../shared/Signup.js';
import Signin from '../shared/Signin.js';
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

export default {
    routes: [
        {
            path: '/',
            component: Home,
            exact: true
        },
        {
            path: '/signup',
            component: Signup,
            exact: true
        },
        {
            path: '/signin',
            component: Signin,
            exact: true
        },
    ]
} 