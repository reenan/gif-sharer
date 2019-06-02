import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { Upload, SharedGIF } from './pages';

export default () => (
	<Switch>
		<Route path='/:id' exact component={SharedGIF} />
		<Route path='/' exact component={Upload} />
		<Redirect from='*' to='/' />
	</Switch>
)