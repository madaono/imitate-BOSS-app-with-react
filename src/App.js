import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import BossInfo from './container/bossinfo/bossinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

class App extends Component {
  render() {
    return (
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
