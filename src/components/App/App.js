/*global gapi*/
import React, { Component } from 'react';
import {
  Heading,
  Pane,
  Button,
} from 'evergreen-ui';

import config from '../../config';
import TicketFinder from '../TicketFinder/TicketFinder';

// Client ID and API key from the Developer Console
var CLIENT_ID = config.GOOGLE_CLIENT_ID;
var API_KEY = config.GOOGLE_API_KEY;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
    }

    gapi.load('client:auth2', this.initClient);
  }

  initClient = async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    });

    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
  
    // Handle the initial sign-in state.
    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  updateSigninStatus = async (isSignedIn) => {
    this.setState({
      isSignedIn,
    });
  }

  handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();
  }

  render() {
    const { isSignedIn } = this.state;

    return (
      <Pane>
        <Pane display="flex" padding={16} background="greenTint">
          <Pane flex={1} alignItems="center" display="flex">
            <Heading size={600}>Tickets</Heading>
          </Pane>
        
          {
            isSignedIn ?
            <Button onClick={this.handleSignoutClick}>Sign out</Button>
            :
            <Button appearance="primary" onClick={this.handleAuthClick}>Sign in</Button>
          }
        </Pane>

        {
           isSignedIn && <TicketFinder/>
        }
      </Pane>
    );
  }
}

export default App;
