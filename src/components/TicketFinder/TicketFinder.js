/* global gapi */
import React, { Component } from 'react';
import { Pane, Spinner } from 'evergreen-ui';
import Ticket from '../Ticket/Ticket';
import ticketCore from './../../core/ticket-core';

export default class TicketFinder extends Component {
  state = {
    loading: true,
    error: null,
    tickets: [],
    openQr: null,
  }

  fetchTickets = async () => {
    this.setState({
      loading: true,
      error: null,
    });

    try {
      for await (const ticket of ticketCore.findMostRelevantTickets()) {
        this.setState({
          tickets: [ ...this.state.tickets, ticket],
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error(error);
      this.setState({
        error,
        loading: false,
      });
    }
  }

  async componentDidMount() {
    await this.fetchTickets();
  }

  render() {
    const { loading, error, tickets } = this.state;

    return loading ?
      <Pane display="flex" alignItems="center" justifyContent="center" height="90vh">
        <Spinner />
      </Pane>
      :
      error ?
        <Pane>Error</Pane>
        :
        <Pane padding={8}>
          <Ticket/>
          {
            tickets.map(ticket => (
              <Pane margin={8}>
                {JSON.stringify(ticket)}
              </Pane>
            ))
          }
        </Pane>;
  }
}
