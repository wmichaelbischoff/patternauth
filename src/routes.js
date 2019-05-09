import React from 'react';
import {Switch, Route} from 'react-router-dom';

import NineAuth from './components/NineAuth/NineAuth';
import Profile from './components/Profile/Profile'


export default(
    <Switch>
        <Route path='/profile' component={Profile} />
        <Route exact path='/' component={NineAuth} />
    </Switch>
)