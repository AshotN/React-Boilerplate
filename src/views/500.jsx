import React from 'react'
export default class Error500 extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='500'>
				Error 500
			</div>
		);
	}
}
// Verify Prop Types
Error500.propTypes = {};

