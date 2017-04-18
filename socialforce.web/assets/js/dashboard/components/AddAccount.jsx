import React from "react";
import ReactDOM from "react-dom";
import * as requestStatus from '../constants/RequestStatus';
import Loader from "../components/Loader";

class AddAccount extends React.Component {
    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleAccountTypeClick = this.handleAccountTypeClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmationCodeChanged = this.handleConfirmationCodeChanged.bind(this);
        this.addAccountCompleted = this.addAccountCompleted.bind(this);

        this.state = {
            accountType: null,
            login: null,
            password: null,
            need_confirmation: false,
            confirmation_code: null,
            account_id: null
        }
    }

    handleClose(){
        this.props.onClose();
    }

    componentDidMount(){
        var modalNode = ReactDOM.findDOMNode(this);
        var modalDialogNode = modalNode.childNodes[0];

        setTimeout(function(){modalNode.classList.add("show");},0);
        modalDialogNode.style.transform = "translate(0,-25%)";
        modalDialogNode.style.opacity = "0";
        setTimeout(function(){
            modalDialogNode.style.transform = "translate(0,0)";
            modalDialogNode.style.opacity = "1";
        }, 100)

        var backdrop = document.createElement('div');
        backdrop.className = "modal-backdrop fade";
        backdrop.id = "modal-backdrop";
        document.body.appendChild(backdrop);
        setTimeout(function(){backdrop.classList.add("show");},0);


    }

    componentWillUnmount(){
        var backdrop = document.getElementById("modal-backdrop");
        if(backdrop){
            document.body.removeChild(backdrop);
        }
    }

    addAccountCompleted(){
        setTimeout(this.props.onClose, 1000);
    }

    componentWillReceiveProps(props){
        if(props.state.addAccount.state && props.state.addAccount.state.status == "success"){
            this.addAccountCompleted();
        }
        if(props.state.updateConfirmationCode.state && props.state.updateConfirmationCode.state.status == "success"){
            this.addAccountCompleted();
        }
        if(props.state.addAccount.state && props.state.addAccount.state.status == "need_confirmation"){
            this.setState({
                need_confirmation: true,
                account_id: props.state.addAccount.state.id
            });
        }
    }

    handleAccountTypeClick(type){
        console.log("Account type clicked: "+type);
        this.setState({accountType: type});
    }

    handleSaveClick(){
        if(!this.state.need_confirmation){
            var account = {
                type: this.state.accountType,
                login: this.state.login,
                password: this.state.password
            };
            this.props.addAccount(account);
        } else {
            var updateCode = {
                id: this.state.account_id,
                code: this.state.confirmation_code
            }
            this.props.updateConfirmationCode(updateCode);
        }

    }

    handleLoginChange(e){
        this.setState({login: e.target.value});
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }

    handleConfirmationCodeChanged(e){
        this.setState({confirmation_code: e.target.value});
    }

    render(){
        let addAccountResult = null;
        if(this.props.state.addAccount.requestStatus == requestStatus.STARTED){
            addAccountResult = <Loader/>
        } else if(this.props.state.addAccount.requestStatus == requestStatus.SUCCESS){
            let alertClass = null;
            switch(this.props.state.addAccount.state.status){
                case "success": alertClass = "alert-success"; break;
                case "need_confirmation": alertClass = "alert-warning"; break;
                default: alertClass = "alert-danger";
            }
            addAccountResult =
                <div className={"alert "+alertClass} role="alert">
                    {this.props.state.addAccount.state.message}
                </div>
        }
        let updateConfirmationCodeResult = null;
        if(this.props.state.updateConfirmationCode.requestStatus == requestStatus.STARTED){
            updateConfirmationCodeResult = <Loader/>
        }else if(this.props.state.updateConfirmationCode.requestStatus == requestStatus.SUCCESS){
            let alertClass = null;
            switch(this.props.state.updateConfirmationCode.state.status){
                case "success": alertClass = "alert-success"; break;
                default: alertClass = "alert-danger";
            }
            updateConfirmationCodeResult =
                <div className={"alert "+alertClass} role="alert">
                    {this.props.state.updateConfirmationCode.state.message}
                </div>
        }

        return(
            <div className="modal fade">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add account</h5>
                            <button type="button" className="close" onClick={this.handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form autoComplete="false" className="form-horizontal" method="POST">
                                <div className="form-group row">
                                    <label className="col-sm-3 control-label" htmlFor="email">Account type</label>
                                    <div className="col-sm-7 account-type-selector">
                                        <button type="button" onClick={()=>this.handleAccountTypeClick("instagram")} className={"btn btn-instagram "+(this.state.accountType === "instagram"?"selected":"")}><i className="fa fa-instagram"></i> Instagram</button>
                                        <button type="button" onClick={()=>this.handleAccountTypeClick("twitter")} className={"btn btn-twitter "+(this.state.accountType === "twitter"?"selected":"")}><i className="fa fa-twitter"></i> Twitter</button>
                                    </div>
                                </div>
                                {this.state.accountType ? <div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 control-label" htmlFor="login">Login</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" onChange={this.handleLoginChange} ref="login" type="text" name="login" id="login" placeholder="Login"
                                                  defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 control-label" htmlFor="password">Password</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" onChange={this.handlePasswordChange} type="password" ref="password" name="password" id="password" placeholder="Password"
                                                   defaultValue="" autoComplete="new-password"   />
                                        </div>
                                    </div>
                                    {addAccountResult ?
                                            <div className="row">
                                                <div className="offset-sm-3 col-sm-7">
                                                    {addAccountResult}
                                                </div>
                                            </div>
                                        : ""}
                                    {this.state.need_confirmation?
                                        <div className="form-group row">
                                        <label className="col-sm-3 control-label" htmlFor="confirmation_code">Code</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" onChange={this.handleConfirmationCodeChanged} type="text" ref="confirmation_code" name="confirmation_code" id="confirmation_code" placeholder="Code"
                                                   defaultValue="" />
                                        </div>
                                    </div> :""}
                                </div>: ""}
                                {updateConfirmationCodeResult ?
                                    <div className="row">
                                        <div className="offset-sm-3 col-sm-7">
                                            {updateConfirmationCodeResult}
                                        </div>
                                    </div>
                                    : ""}

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSaveClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default AddAccount