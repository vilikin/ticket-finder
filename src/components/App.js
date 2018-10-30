import React from 'react';
import {
  Heading,
  Pane,
  Button,
} from 'evergreen-ui';

import { withGmailClient } from '../utils/gmail-client';
import TicketList from './TicketList';

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

      {
          props.authorized && <TicketList />
      }
  </Pane>
)

export default withGmailClient(App);
