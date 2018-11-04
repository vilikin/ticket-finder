import React, { Component } from 'react';
import { Pane, Spinner } from 'evergreen-ui';
import Ticket from './Ticket';
import { TicketFinder } from '../core/ticket-core';
import { withGmailClient } from '../utils/gmail-client';

class TicketList extends Component {
  constructor(props) {
    super(props);

    this.ticketFinder = new TicketFinder(props.client);

    this.state = {
      loading: true,
      error: null,
      tickets: [],
    };
  }

  async componentDidMount() {
    let errorCount = 0;
    for await (const ticket of this.ticketFinder.findRelevantTickets()) {
      if (ticket instanceof Error) {
        errorCount++;
        continue;
      }

      this.setState({
        tickets: [ ...this.state.tickets, ticket],
        loading: false,
      });
    }

    console.log(`Finished fetching relevant tickets with ${errorCount} error(s).`);
  }

  render() {
    const { loading, tickets } = this.state;

    if (loading) {
      return (
        <Pane display="flex" alignItems="center" justifyContent="center" height="90vh">
          <Spinner />
        </Pane>
      );
    }

    return (
      <Pane padding={8}>
        {
          tickets.map(ticket => (
            <Ticket
              key={ticket.id}
              {...ticket}
            />
          ))
        }
      </Pane>
    );
  }
}

export default withGmailClient(TicketList);
