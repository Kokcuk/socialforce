import * as types from '../constants/ActionTypes';
import * as requestStatus from '../constants/RequestStatus';

const initialStore = {
    accounts: {
        requestStatus: requestStatus.IDLE,
        accounts: []
    },
    addAccount:{
        requestStatus: requestStatus.IDLE,
        state: null
    },
    updateConfirmationCode:{
        requestStatus: requestStatus.IDLE,
        state: null
    },
    deleteAccount:{
        requestStatus: requestStatus.IDLE,
        state: null
    },
    accountDetails: {
        requestStatus: requestStatus.IDLE,
        accountDetails: null
    }
};

export default function reduce(state = initialStore, action){
    switch (action.type){
        case types.LOAD_ACCOUNTS_LIST:
            return {
                ...state,
                accounts: {
                    requestStatus: action.status,
                    accounts: action.data
                }
            };
        case types.ADD_ACCOUNT:
            return {
                ...state,
                addAccount: {
                    requestStatus: action.status,
                    state: action.data
                }
            };
        case types.UPDATE_CONFIRMATION_CODE:
            return {
                ...state,
                updateConfirmationCode: {
                    requestStatus: action.status,
                    state: action.data
                }
            };
        case types.DELETE_ACCOUNT:
            return {
                ...state,
                deleteAccount: {
                    requestStatus: action.status,
                    state: action.data
                }
            };
        case types.GET_ACCOUNT_DETAILS:
            return {
                ...state,
                accountDetails: {
                    requestStatus: action.status,
                    accountDetails: action.data
                }
            };
        default:
            return state;
    }
}