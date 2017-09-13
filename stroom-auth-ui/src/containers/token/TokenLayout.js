import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {fullWhite} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'
import Toggle from 'material-ui/Toggle'
import Dialog from 'material-ui/Dialog'
import {blue600, amber900} from 'material-ui/styles/colors'
import Paper from 'material-ui/Card'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import Add from 'material-ui-icons/Add'
import Delete from 'material-ui-icons/Delete'
import Edit from 'material-ui-icons/Edit'
import Help from 'material-ui-icons/Help'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

import TokenSearch from '../tokenSearch'
import { deleteSelectedToken, toggleAlertVisibility } from '../../modules/token'
import { relativePath } from '../../relativePush'

import './Token.css'

// TODO: make the CSS specific to token, or make it common
class TokenLayout extends Component {
  constructor() {
    super()
    this.state = {
      isFilteringEnabled: false,
      isHelpDialogOpen: false
    }
  }

  deleteToken(){
    this.context.store.dispatch(deleteSelectedToken())
  }

  toggleFiltering(isFilteringEnabled){
    this.setState({isFilteringEnabled})
  }

  handleHelpDialogOpen = () => {
    this.setState({isHelpDialogOpen: true});
  };

  handleHelpDialogClose = () => {
    this.setState({isHelpDialogOpen: false});
  };

  render() {
    const { show, selectedTokenRowId, showAlert, alertText, toggleAlertVisibility } = this.props
    var showSearch = show === 'search'
    var showCreate = show === 'create'
    var showEdit = show === 'edit'
    var showCreateButton = showSearch 
    var deleteButtonDisabled = selectedTokenRowId ? false : true
    return (
      <Paper className='UserLayout-main' zDepth={0}>
        <Toolbar>
          <ToolbarGroup>
            <NavLink to={relativePath('/tokens')}>
              <ToolbarTitle text="Tokens" className="UserLayout-toolbarTitle"/>
            </NavLink>
            {showCreate || showEdit ? (<KeyboardArrowRight className="UserLayout-toolbarSeparator"/>) : (undefined)}
            {showCreate ? (<ToolbarTitle text="Create" className="UserLayout-toolbarTitle"/>) : (undefined)}
            {showEdit ? (<ToolbarTitle text="Edit" className="UserLayout-toolbarTitle"/>) : (undefined)}
          </ToolbarGroup>
          <ToolbarGroup>

            {showSearch ? (
              <div className="UserLayout-toolbarButton">
                <Toggle
                  label="Show filtering"
                  labelPosition="right"
                  onToggle= {(event, isFilteringEnabled)=> this.toggleFiltering(isFilteringEnabled)}/>
              </div>
            ) : (undefined)}

            {showCreateButton ? (
              <div className="UserLayout-toolbarButton">
                <NavLink to={relativePath('/newUser')}>
                  <RaisedButton label="Create" primary={true} className="UserSearch-appButton" 
                    icon={<Add color={fullWhite}/>}/>
                </NavLink>
              </div>
            ) : (undefined)}

            {showSearch ? (
              <div className="UserLayout-toolbarButton">
                <NavLink to={relativePath(`/user/${selectedTokenRowId}`)}>
                  <RaisedButton label="Edit" primary={true}
                    icon={<Edit color={fullWhite}/>} disabled={deleteButtonDisabled}/>
                </NavLink>
              </div>
            ) : (undefined)}

            {showSearch ? (
              <div className="UserLayout-toolbarButton">
                <RaisedButton label="Delete" primary={true} 
                  icon={<Delete color={fullWhite}/>} disabled={deleteButtonDisabled}
                  onClick={(param1, param2) => this.deleteUser(param1, param2)}/>
              </div>
            ) : (undefined)}

            <IconButton onClick={() => this.handleHelpDialogOpen()}>
              <Help color={blue600} hoverColor={amber900}/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div className="User-content">
          <TokenSearch isFilteringEnabled={this.state.isFilteringEnabled}/>
        </div>
        <Snackbar
          open={showAlert}
          message={alertText}
          autoHideDuration={4000}
          onRequestClose={() => toggleAlertVisibility()}
        />
        <Dialog
          title={<div><span><Help color={blue600}/></span> &nbsp;<span>Tokens</span></div>}
          actions={
            <FlatButton
              label="OK"
              primary={true}
              onTouchTap={this.handleHelpDialogClose}/>}
          modal={false}
          open={this.state.isHelpDialogOpen}
          onRequestClose={this.handleHelpDialogClose}>
          <p>This area is for managing tokens.</p>
          <p>There are two types of tokens: user tokens and API tokens. A user token is that which is issued to a user
            after they log in. The system then uses that token to authenticate them with the various services they might
            need to use to perform whatever it is they want to do. An API token is one issued to a user for them to
            use with their application - it allows them to write an application that integrates with Stroom.</p>
        </Dialog>
      </Paper> 

    )
  }
}

TokenLayout.contextTypes = {
  store: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  show: state.user.show, //TODO wire this in
  selectedUserRowId: state.userSearch.selectedUserRowId, //TODO wire this in
  showAlert: state.user.showAlert, // TODO Wire this in
  alertText: state.user.alertText //TODO wire this in
})

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteSelectedToken,
  toggleAlertVisibility
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenLayout)