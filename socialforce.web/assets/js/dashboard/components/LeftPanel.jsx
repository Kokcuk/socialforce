import React from 'react';
import * as requestStatus from '../constants/RequestStatus';
import Loader from "../components/Loader";
import AddAccount from "../components/AddAccount";
import DeleteAccount from "../components/DeleteAccount";

class LeftPanel extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isAddAccountOpen: false,
            isDeleteAccountOpen: false,
            accounts_filter: null,
            selected_account: null
        };

        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleCloseAddAccount = this.handleCloseAddAccount.bind(this);
        this.handleSearchChanged = this.handleSearchChanged.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.handleCloseDeleteAccount = this.handleCloseDeleteAccount.bind(this);

    }



    componentDidMount() {
        this.props.listAccounts();
    }

    getAccountIcon(type){
        switch(type){
            case "instagram": return <img src="./img/instagram_small.svg"/>;
            case "twitter": return <img src="./img/twitter_small.svg"/>;
            default: return <img src=""/>;
        }

    }


    handleItemClick(item){

    }

    handleClickAdd(){
        this.setState({isAddAccountOpen: true});

    }

    handleSearchChanged(e){
        this.setState({accounts_filter: e.target.value});
    }

    handleCloseAddAccount(){
        this.setState({isAddAccountOpen: false});
        this.props.addAccountCompleted();
        this.props.listAccounts();
    }

    handleCloseDeleteAccount(){
        this.setState({isDeleteAccountOpen: false});
        this.props.listAccounts();
    }

    handleDeleteAccount(item){
        this.setState({
            isDeleteAccountOpen: true,
            selected_account: item
        });
    }

    renderItem(item){
        var itemClass = "stopped-item";
        switch(item.activity_status){
            case "stop": itemClass = "stopped-item";break;
            case "warning": itemClass = "warning-item";break;
            case "running": itemClass = "running-item";break;
            default: itemClass = itemClass = "stopped-item";
        }
        var li = (<li className={itemClass} key={item.id} onClick={()=>this.handleItemClick(item)}>
            {this.getAccountIcon(item.type)}
            <span>{item.name}</span>
            <a href="#" onClick={()=>this.handleDeleteAccount(item)} className="close float-right"><i className="fa fa-close fa-lg"></i></a>
            <a href="#" className="btn btn-danger btn-sm float-right">Stop</a>
        </li>);

        if(this.state.accounts_filter && this.state.accounts_filter.trim().length > 0){
            if(item.name.indexOf(this.state.accounts_filter) != -1){
                return li;
            }else{
                return null;
            }
        }else{
            return li;
        }

    }

    render(){
        return (<div className="col-fixed-320 left-panel">
            <input onChange={this.handleSearchChanged} type="text" className="form-control account-search-input" placeholder="Search accounts"></input>
            <i className="fa fa-search account-search-input-icon"></i>
            <ul className="left-control-bar">
                <li className="decorated-bottom"><span>My accounts</span></li>
                <li>
                    <a onClick={()=>this.handleClickAdd()} href="#" className="btn btn-primary btn-sm">Add</a>
                </li>
            </ul>
            {this.props.state.accounts.requestStatus !== requestStatus.SUCCESS ?
                <Loader/>
                :
                <ul className="accounts-list">
                    {this.props.state.accounts.accounts.map(item=> { return this.renderItem(item);})}
                </ul>
            }
            {this.state.isAddAccountOpen ? <AddAccount
                state={this.props.state}
                addAccount={this.props.addAccount}
                updateConfirmationCode={this.props.updateConfirmationCode}
                onClose={this.handleCloseAddAccount}
                addAccountCompleted={this.props.addAccountCompleted}
            />:""}
            {this.state.isDeleteAccountOpen ? <DeleteAccount
                onClose={this.handleCloseDeleteAccount}
                account={this.state.selected_account}
                deleteAccount={this.props.deleteAccount}
                state={this.props.state}
            />:""}
        </div>);
    }
}

export default LeftPanel