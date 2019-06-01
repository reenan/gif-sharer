import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { Uploader, SharedGIF } from './components';

export default () => (
	<Switch>
	<Route path='/:id' exact component={SharedGIF} />
	<Route path='/' exact component={Uploader} />
		<Redirect from='*' to='/' />
	</Switch>
)