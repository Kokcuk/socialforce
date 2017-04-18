import React from 'react';
import ReactHighcharts from "react-highcharts";

const config = {
    /* HighchartsConfig */
    chart: {
        type: 'line',
        height: '200',
    },
    title: {
        text: '',//Followers / Followings
    },
    xAxis: {
        categories: ['18.04', '19.04', '20.04', '21.04', '22.04', '23.04'],
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        labels: {
            autoRotation:0
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    legend: {
        verticalAlign: "top"
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Followers',
        data: [250, 264, 268, 275, 284, 295]
    }, {
        name: 'Followings',
        data: [450, 470, 475, 460, 450, 455]
    }]
};

class Account extends React.Component {
    render(){
        return (<div className="col-offset-320 dashboard-main">
                <div className="heding-row">
                    <img className="title-img" src="./img/instagram_small.svg"/>
                    <h2>kokcuk_koks</h2>
                    <div className="badge badge-success">Active</div>
                </div>
                <div className="bd-example bd-example-tabs dashboard-tab" id="account-tab" role="tabpanel">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#statistics" role="tab" aria-controls="home" aria-expanded="true">Statistics</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="profile" aria-expanded="false">Settings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="about-tab" data-toggle="tab" href="#activity" role="tab" aria-controls="about" aria-expanded="false">Activity log</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div role="tabpanel" className="tab-pane fade active show" id="statistics" aria-labelledby="home-tab" aria-expanded="true">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="account-stats-short">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="account-stats-short-item"><i className="fa fa-clock-o"></i> Activity time: 1d 3h</div>
                                                <div className="account-stats-short-item"><i className="fa fa-heart"></i> Likes: 48</div>
                                                <div className="account-stats-short-item"><i className="fa fa-comment"></i> Comments: 13</div>
                                                <div className="account-stats-short-item"><i className="fa fa-users"></i> Follows: 10</div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="account-stats-short-item"><i className="fa fa-comment"></i> Posts: 38</div>
                                                <div className="account-stats-short-item"><i className="fa fa-users"></i> Followers: 119</div>
                                                <div className="account-stats-short-item"><i className="fa fa-users"></i> Following: 318</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="statistics-followers-chart">
                                        <ReactHighcharts config = {config}></ReactHighcharts>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="profile-tab" aria-expanded="false">
                            <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                        </div>
                        <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="profile-tab" aria-expanded="false">
                            <p>Pidor truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account