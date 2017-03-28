import React from 'react';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

	}

	render() {
		return (
			<div>
				<div className='wrapper'>
					<div>Hello World</div>
				</div>
			</div>
		);
	}
}

App.contextTypes = {
	router: React.PropTypes.object.isRequired
};
