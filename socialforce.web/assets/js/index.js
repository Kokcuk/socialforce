require('../css/index.scss');
var bootstrap = require('./bs4');
var userMenu = document.getElementById("user-menu");
var tab = document.getElementById("account-tab");
bootstrap.Dropdown(userMenu);
bootstrap.Tab(tab);