import React from "react";
import ReactDOM from "react-dom";


class DeleteAccount extends React.Component {
    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClose(){
        this.props.onClose();
    }

    handleDelete(){
        this.props.deleteAccount(this.props.account.id);
    }

    componentWillReceiveProps(props){
        if(props.state.deleteAccount.state && props.state.deleteAccount.state.status == "success"){
            this.handleClose();
        }
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




    render(){
        return(
            <div className="modal fade" id="test1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete account</h5>
                            <button type="button" className="close" onClick={this.handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span>Are you sure you want to delete account: <strong>{this.props.account.name}</strong></span>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.handleClose} className="btn btn-secondary">Close</button>
                            <button type="button" onClick={this.handleDelete} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteAccount