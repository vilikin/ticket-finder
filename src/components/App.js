import React from 'react';
import {
  Heading,
  Pane,
  Button,
  Icon,
  Text,
} from 'evergreen-ui';

import { withGmailClient } from '../utils/gmail-client';
import TicketList from './TicketList';
import ProgressBar from './ProgressBar';

const App = (props) => (
  <Pane>
    <Pane display="flex" padding={16} background="greenTint">
      <Pane flex={1} alignItems="center" display="flex">
        <Heading size={600}>Tickets</Heading>
      </Pane>
    
      {
        props.authorized ?
          <Button onClick={props.client.signOut}>Sign out</Button>
          :
          <Button intent="success" appearance="primary" onClick={props.client.signIn}>
            Sign in
          </Button>
      }

    </Pane>

    <ProgressBar />

    {
        props.authorized
        ? <TicketList />
        : <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            height="calc(100vh - 64px)"
          >
            <Icon icon="train" size={60} color="success"/>
            <Text color="muted" marginTop={16} marginX={30} align="center">
              Welcome to Ticket Finder!
            </Text>
            <Text color="muted" marginTop={16} marginX={30} align="center">
              Sign in with your Google account to find train tickets from your Gmail Inbox.
            </Text>
          </Pane>
    }
  </Pane>
)

export default withGmailClient(App);
