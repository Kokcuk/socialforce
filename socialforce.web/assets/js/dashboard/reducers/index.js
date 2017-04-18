import { combineReducers } from 'redux';

import dashboardReduce from "./DashboardReducers";

const rootReducer = combineReducers({
    dashboard: dashboardReduce
});

export default rootReducer;