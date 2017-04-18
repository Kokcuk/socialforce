import React from "react";

export default class Loader extends React.Component {
    render() {
        return (
            <div className="loader-container">
                <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
            </div>
        );
    }
}