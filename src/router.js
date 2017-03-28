import React from 'react';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
import App from './views/App';
import Home from './views/Home';

module.exports = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
		</Route>
	</Router>);
