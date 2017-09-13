import React, { Component } from 'react'
import PropTypes, { object } from 'prop-types'
import {Route, Redirect, NavLink, withRouter, Switch, BrowserRouter} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import Dialog from 'material-ui/Dialog'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import ExitToApp from 'material-ui-icons/ExitToApp'
import Lock from 'material-ui-icons/Lock'
import MoreVert from 'material-ui-icons/MoreVert'
import {fullWhite} from 'material-ui/styles/colors'

import './App.css'
import logo from './logo.svg'
import Login from '../../containers/login'
import Logout from '../../containers/logout'
import {UserCreate, UserEdit, UserSearch} from '../../containers/user'
import {TokenSearch} from '../../containers/token'
import NewUser from '../../containers/newUser'
import PathNotFound from '../../containers/pathNotFound'
import ResetPassword from '../../containers/resetPassword'
import ChangePassword from '../../containers/changePassword'
import ResetPasswordRequest from '../../containers/resetPasswordRequest'
import ConfirmPasswordResetEmail from '../../containers/confirmPasswordResetEmail'
import Home from '../../containers/home'
import Unauthorised from '../../containers/unauthorised'
import {handleSessionTimeout} from '../../modules/login'
import { goToStroom } from '../../modules/sidebar'
import { relativePath } from '../../relativePush'

class App extends Component {

  isLoggedIn(){
    return this.props.token ? true : false
  }

  render() {
    return (
      <div className="App">
        {this.isLoggedIn() ? (
        <AppBar
          title={<NavLink to={relativePath('/')}><img src={logo} className="App-logo" alt="Stroom logo"/></NavLink>}
              iconElementLeft={<div/>}
              iconElementRight= {
                <div className="App-appBar-buttons">
                  <IconMenu
                    iconButtonElement={
                      <IconButton className="App-iconButton"><MoreVert color={fullWhite}/></IconButton>
                    }>
                    {this.isLoggedIn() ? (
                      <div>
                      <NavLink to={relativePath("/changepassword")}>
                        <MenuItem primaryText="Change password" leftIcon={<Lock/>}/>
                      </NavLink>
                      <NavLink to={relativePath("/logout")}>
                        <MenuItem primaryText="Log out" leftIcon={<ExitToApp/>}/>
                      </NavLink>
                      </div>
                    ) : (
                      <NavLink to={relativePath("/login")}>
                        <MenuItem primaryText="Log in"/>
                      </NavLink>
                    )}
                  </IconMenu>
                </div>
              }
          />
        ) : (<div/>)}

        <main className='main'>
          <div >
            <BrowserRouter basename={process.env.REACT_APP_ROOT_PATH }/>
            <Switch>
              <Route exact path={relativePath("/")} render={() => (
                this.isLoggedIn() ? (
                  <Home/>
                ) : (
                  <Redirect to={{
                    pathname: process.env.REACT_APP_ROOT_PATH + '/login',
                    state: {referrer:relativePath('/')}}}/>
                )
              )} />

              <Route exact path={relativePath("/login")} component={Login} />
              <Route exact path={relativePath("/logout")} component={Logout} />
              <Route exact path={relativePath("/newUser")} component={NewUser}/>
              <Route exact path={relativePath("/resetPassword")} component={ResetPassword}/>
              <Route exact path={relativePath("/confirmPasswordResetEmail")} component={ConfirmPasswordResetEmail}/>
              <Route exact path={relativePath("/resetPasswordRequest")} component={ResetPasswordRequest}/>
              <Route exact path={relativePath("/Unauthorised")} component={Unauthorised}/>

              <Route exact path={relativePath("/userSearch")} render={() => (
                this.isLoggedIn() ? (
                  <UserSearch/>
                ) : (
                  // We record the referrer because Login needs it to redirect back to after a successful login.
                  <Redirect to={{
                    pathname: relativePath('/login'),
                    state: {referrer:relativePath('/userSearch')}}}/>
                )
              )}/>

              <Route exact path={relativePath("/changepassword")} render={(route) => (
                this.isLoggedIn() ? (
                  <ChangePassword/>
                ) : (
                   // We record the referrer because Login needs it to redirect back to after a successful login.
                  <Redirect to={{
                    pathname: relativePath('/login'),
                    state: {referrer:route.location.pathname}}}/>
                )
              )}/>

              <Route exact path={relativePath("/user")} render={() => (
                this.isLoggedIn() ? (
                  <UserCreate/>
                ) : (
                  // We record the referrer because Login needs it to redirect back to after a successful login.
                  <Redirect to={{
                    pathname: relativePath('/login'),
                    state: {referrer:relativePath('/user')}}}/>
                )
              )}/>

              <Route exact path={relativePath("/user/:userId")} render={(route) => (
                this.isLoggedIn() ? (
                  <UserEdit/>
                ) : (
                  // We record the referrer because Login needs it to redirect back to after a successful login.
                  <Redirect to={{
                    pathname: relativePath('/login'),
                    state: {referrer:route.location.pathname}}}/>
                )
              )}/>

              <Route exact path={relativePath("/tokens")} render={() => (
                  this.isLoggedIn() ? (
                      <TokenSearch/>
                  ) : (
                      // We record the referrer because Login needs it to redirect back to after a successful login.
                      <Redirect to={{
                        pathname: relativePath('/login'),
                        state: {referrer:relativePath('/tokens')}}}/>
                  )
              )}/>


              <Route component={PathNotFound}/>

            </Switch>
          </div>
        </main>
         <Dialog
          title="Unauthorised!"
          actions={[
            <FlatButton
              label="Log in again"
              primary={true}
              onTouchTap={this.props.handleSessionTimeout}
            />
          ]}
          modal={true}
          open={this.props.showUnauthorizedDialog}
        >
          It's likely that your session has timed-out. Would you like to try logging in again?
        </Dialog>
      </div>
    )
  }
}

App.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.shape({
    history: object.isRequired,
  }),
}

App.propTypes = {
  token: PropTypes.string.isRequired,
  showUnauthorizedDialog: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  token: state.login.token,
  showUnauthorizedDialog: state.login.showUnauthorizedDialog
})

const mapDispatchToProps = dispatch => bindActionCreators({
  goToStroom,
  handleSessionTimeout
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
