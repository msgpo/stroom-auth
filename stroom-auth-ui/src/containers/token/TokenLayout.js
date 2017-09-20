/*
 * Copyright 2017 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import Help from 'material-ui-icons/Help'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

import TokenSearch from '../tokenSearch'
import TokenCreate from '../tokenCreate'
import { deleteSelectedToken, toggleAlertVisibility } from '../../modules/token'
import { relativePath } from '../../relativePush'

import './Token.css'

// TODO: make the CSS specific to token, or make it common
class TokenLayout extends Component {
  constructor() {
    super();
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
    const { show, selectedTokenRowId, showAlert, alertText, toggleAlertVisibility } = this.props;
    var showSearch = show === 'search';
    var showCreate = show === 'create';
    var showCreateButton = showSearch;
    var deleteButtonDisabled = !selectedTokenRowId;
    return (
      <Paper className='UserLayout-main' zDepth={0}>
        <Toolbar>
          <ToolbarGroup>
            <NavLink to={relativePath('/tokens')}>
              <ToolbarTitle text="Tokens" className="UserLayout-toolbarTitle"/>
            </NavLink>
            {showCreate ? (<KeyboardArrowRight className="UserLayout-toolbarSeparator"/>) : (undefined)}
            {showCreate ? (<ToolbarTitle text="Create" className="UserLayout-toolbarTitle"/>) : (undefined)}
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
                <NavLink to={relativePath('/token/newApiToken')}>
                  <RaisedButton label="Issue API token" primary={true} className="UserSearch-appButton"
                    icon={<Add color={fullWhite}/>}/>
                </NavLink>
              </div>
            ) : (undefined)}

            {showSearch ? (
              <div className="UserLayout-toolbarButton">
                <RaisedButton label="Delete" primary={true} 
                  icon={<Delete color={fullWhite}/>} disabled={deleteButtonDisabled}
                  onClick={() => this.deleteToken()}/>
              </div>
            ) : (undefined)}

            <IconButton onClick={() => this.handleHelpDialogOpen()}>
              <Help color={blue600} hoverColor={amber900}/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div className="User-content">
          {showSearch ? (<TokenSearch isFilteringEnabled={this.state.isFilteringEnabled}/>) : (undefined)}
          {showCreate ? (<TokenCreate/>) : (undefined)}
        </div>
        <Snackbar
          open={showAlert}
          message={alertText}
          autoHideDuration={4000}
          onRequestClose={() => toggleAlertVisibility('')}
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
};

const mapStateToProps = state => ({
  show: state.token.show,
  selectedTokenRowId: state.tokenSearch.selectedTokenRowId,
  showAlert: state.token.showAlert,
  alertText: state.token.alertText
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteSelectedToken,
  toggleAlertVisibility
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenLayout)