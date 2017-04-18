import * as types from "../constants/ActionTypes";
import * as requestStatus from "../constants/RequestStatus";
import axios from "axios";

export function loadAccountsList(){
    return (dispatch) => {
        axios.get('/accounts/list')
            .then(function(response){
                dispatch({type:types.LOAD_ACCOUNTS_LIST, status:requestStatus.SUCCESS, data: response.data});
            })
            .catch(function(error){
                dispatch({type:types.LOAD_ACCOUNTS_LIST, status:requestStatus.FAIL, data: null});
                console.log(error);
            });
    }
}

export function addAccount(account){
    return (dispatch) => {
        dispatch({type: types.ADD_ACCOUNT, status: requestStatus.STARTED, data: null});
        axios.post("/accounts/add", account)
            .then(function (response) {
                dispatch({type: types.ADD_ACCOUNT, status: requestStatus.SUCCESS, data: response.data});
            })
            .catch(function(error){
                dispatch({type: types.ADD_ACCOUNT, status: requestStatus.FAIL, data: null});
                console.log(error);
            });
    };
}

export function updateConfirmationCode(updateConfirmation){
    return (dispatch) => {
        dispatch({type: types.UPDATE_CONFIRMATION_CODE, status: requestStatus.STARTED, data: null});
        axios.post("/accounts/updateConfirmationCode", updateConfirmation)
            .then(function (response) {
                dispatch({type: types.UPDATE_CONFIRMATION_CODE, status: requestStatus.SUCCESS, data: response.data});
            })
            .catch(function(error){
                dispatch({type: types.UPDATE_CONFIRMATION_CODE, status: requestStatus.FAIL, null});
                console.log(error);
            });
    };
}

export function addAccountCompleted(){
    return (dispatch) =>{
        dispatch({type: types.ADD_ACCOUNT, status: requestStatus.IDLE, data: null});
        dispatch({type: types.UPDATE_CONFIRMATION_CODE, status: requestStatus.IDLE, data: null});
    };
}

export function deleteAccount(id){
    return (dispatch) => {
        dispatch({type: types.DELETE_ACCOUNT, status: requestStatus.STARTED, data: null});
        axios.post("/accounts/delete", {id:id})
            .then(function (response) {
                dispatch({type: types.DELETE_ACCOUNT, status: requestStatus.SUCCESS, data: response.data});
            })
            .catch(function(error){
                dispatch({type: types.DELETE_ACCOUNT, status: requestStatus.FAIL, data: null});
                console.log(error);
            });
    };
}

export function getAccountDetails(id){
    return (dispatch) =>{
        dispatch({type: types.GET_ACCOUNT_DETAILS, status: requestStatus.STARTED, data: null});
        axios.get('/accounts/details/'+id)
            .then(function(response){
                dispatch({type:types.GET_ACCOUNT_DETAILS, status:requestStatus.SUCCESS, data: response.data});
            })
            .catch(function(error){
                dispatch({type:types.GET_ACCOUNT_DETAILS, status:requestStatus.FAIL, data: null});
                console.log(error);
            });
    };
}