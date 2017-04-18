import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import DevTools from '../containers/DevTools';
import { persistState } from 'redux-devtools';

const enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers',
            () => {
                const nextRootReducer = require('../reducers');
                store.replaceReducer(nextRootReducer);
            });
    }

    return store;
}