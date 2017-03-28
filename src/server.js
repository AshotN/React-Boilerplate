'use strict';

const PORT = 3000;

import {join} from 'path';
import express from 'express';
import ReactEngine from 'react-engine';
import routes from './router';
let Couleurs = require('couleurs');
Couleurs.proto();

let app = express();

// create the view engine with `react-engine`
let engine = ReactEngine.server.create({
	routes: routes,
	routesFilePath: join(__dirname, './router')
});

// set the engine

app.engine('.jsx', engine);

// set the view directory
app.set('views', join(__dirname, './views'));

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', ReactEngine.expressView);

// expose public folder as static assets
app.use(express.static(join(__dirname, './public/assets/')));

// add our app routes
app.get('*', function(req, res) {
	res.render(req.url);
});

app.use(function(err, req, res, next) {
	console.error(err);

	// http://expressjs.com/en/guide/error-handling.html
	if(res.headersSent) {
		return next(err);
	}

	if(err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
		return res.redirect(302, err.redirectLocation);
	}
	else if(err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
		return res.status(404).render(req.url);
	}
	else {
		// for ReactEngine.reactRouterServerErrors.MATCH_INTERNAL_ERROR or
		// any other error we just send the error message back
		return res.status(500).render('500.jsx', {
			err: {
				message: err.message,
				stack: err.stack
			}
		});
	}
});

app.listen(PORT, function() {
	console.log("Example app listening at " + "http://localhost:%s".fg(0, 255, 0), PORT);
});