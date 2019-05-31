import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { Uploader } from './components';

export default () => (
	<Switch>
		<Route path='/' component={Uploader} />
		<Redirect from='*' to='/' />
	</Switch>
)