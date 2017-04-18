import React from "react";
import LeftPanel from "../components/LeftPanel";
import Account from "../components/Account";
import DevTools from "../containers/DevTools";
import { bindActionCreators } from 'redux';
import * as actions from '../actions/DashboardActions';
import { connect } from 'react-redux';

class Root extends React.Component {
    render(){
        return (
            <div>
                <LeftPanel
                    listAccounts={this.props.actions.loadAccountsList}
                    addAccount={this.props.actions.addAccount}
                    updateConfirmationCode={this.props.actions.updateConfirmationCode}
                    addAccountCompleted={this.props.actions.addAccountCompleted}
                    deleteAccount={this.props.actions.deleteAccount}
                    state={this.props.state}
                />
                <Account/>
                {/*<DevTools/>*/}
                <DevTools visibleOnLoad={false}/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        state: state.dashboard
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)