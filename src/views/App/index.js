import React from 'react'
export default class HomeView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<html lang='en'>
			<head>
				<meta charSet='utf-8'/>
				<title>React Engine Example App</title>
				<meta name='viewport' content='width=device-width, initial-scale=1'/>
				<link href='css/index.css' rel='stylesheet'/>
				<link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel='stylesheet' />
			</head>
			<body>
			<div>
				<header>
					<div className='title'>Boiler Plate</div>
				</header>
				{this.props.children}
			</div>
			</body>
			</html>
		);
	}
}
// Verify Prop Types
HomeView.propTypes = {};

