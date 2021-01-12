import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';

import reducers from './reducers';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';

const store = createStore(
    reducers,
    {
        auth: { authenticated: localStorage.getItem('token') }
    },
    applyMiddleware(reduxThunk)
)

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App >
                <Route path="/" exact component={Welcome}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/feature" exact component={Feature}></Route>
                <Route path="/signout" exact component={Signout}></Route>
                <Route path="/signin" exact component={Signin}></Route>
            </App>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#root'));
