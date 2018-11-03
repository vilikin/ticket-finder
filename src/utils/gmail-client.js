/* global gapi */
import React from 'react';
import * as _ from 'lodash';
import * as parseMessage from 'gmail-api-parse-message';

import config from '../config';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

let gmailClient;

// makes sure that GmailClient stays as a sigleton
export function getGmailClient() {
  if (!gmailClient) {
    gmailClient = new GmailClient();
  }

  return gmailClient;
}

class GmailClient {
  constructor() {
    this.authStatusListeners = [];
    this.authorized = false;

    gapi.load('client:auth2', this.initClient);
  }

  initClient = async () => {
    await gapi.client.init({
      apiKey: config.GOOGLE_API_KEY,
      clientId: config.GOOGLE_CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });

    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateAuthStatus);
  
    const isInitiallyAuthorized = gapi.auth2.getAuthInstance().isSignedIn.get();
    this.updateAuthStatus(isInitiallyAuthorized);
  }

  updateAuthStatus = (authorized) => {
    this.authorized = authorized;

    this.callAuthStatusListeners(authorized);
  }

  callAuthStatusListeners = (authorized) => {
    _.forEach(this.authStatusListeners, ({ callback }) => callback(authorized));
  }

  signIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  }

  signOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  }

  addAuthStatusListener = (callback) => {
    const listener = {
      id: _.uniqueId(),
      callback,
    };

    this.authStatusListeners.push(listener);

    return listener.id;
  }

  removeAuthStatusListener = (id) => {
    this.authStatusListeners = _.reject(this.authStatusListeners, { id });
  }

  isAuthorized = () => {
    return this.authorized;
  }

  assertAuthorized = () => {
    if (!this.isAuthorized()) {
      throw new Error('Google API not authenticated');
    }
  }

  findMessagesByQuery = async (query) => {
    this.assertAuthorized();

    const { result: { messages } } = await gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'q': query,
    });

    return messages;
  }

  getMessageDetails = async (messageId) => {
    const { result: message } = await gapi.client.gmail.users.messages.get({
      'userId': 'me',
      'id': messageId,
    });
  
    return parseMessage(message);
  }

  getAttachment = async (messageId, attachmentId) => {
    const { result: attachment } = await gapi.client.gmail.users.messages.attachments.get({
      'userId': 'me',
      'id': attachmentId,
      'messageId': messageId,
    });

    return attachment;
  }
}

export function withGmailClient(WrappedComponent) {
  return class WithGmailWrapper extends React.Component {
    constructor(props) {
      super(props);

      this.gmailClient = getGmailClient();

      this.state = {
        authorized: this.gmailClient.isAuthorized(),
      };

      this.gmailClient.addAuthStatusListener((authorized) => {
        this.setState({
          authorized,
        });
      });
    }

    render() {
      return (
        <WrappedComponent client={this.gmailClient}
                          authorized={this.state.authorized}
        />
      );
    }
  }
}
