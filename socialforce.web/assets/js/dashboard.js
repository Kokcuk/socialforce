require('../css/index.scss');
require("react-hot-loader/patch");
var bootstrap = require('./bs4');
__webpack_public_path__ = 'http://localhost:8080/static/';

import React from "react";
import ReactDOM from 'react-dom';
import Root from './dashboard/containers/Root';
import configureStore from './dashboard/store/configureStore';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

var userMenu = document.getElementById("user-menu");
bootstrap.Dropdown(userMenu);

const store = configureStore();
const rootEl = document.getElementById('root');

const render = (Component) => {
    return ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        rootEl
    );
}

render(Root);
if (module.hot) {
    module.hot.accept("./dashboard/containers/Root", () => {
        render(Root)
    });
}