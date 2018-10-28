/* global gapi */
import React, { Component } from 'react';
import { Pane, Spinner, Dialog } from 'evergreen-ui';
import Ticket from '../Ticket/Ticket';
import ticketCore from './../../core/ticket-core';

export default class TicketFinder extends Component {
  state = {
    loading: true,
    error: null,
    tickets: [],
    showingQrCode: false,
    qrCodeDataURI: null,
  }

  showQrCodeDialog = async (ticket) => {
    this.setState({
      showingQrCode: true,
    });

    const qrCodeDataURI = await ticketCore.getQrCodeDataURI(ticket.messageId, ticket.attachmentId)

    this.setState({
      qrCodeDataURI,
    });
  }

  closeQrCodeDialog = async () => {
    this.setState({
      showingQrCode: false,
      qrCodeDataURI: null,
    });
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
    const {
      loading,
      error,
      tickets,
      showingQrCode,
      qrCodeDataURI,
    } = this.state;

    if (loading) {
      return (
        <Pane display="flex" alignItems="center" justifyContent="center" height="90vh">
          <Spinner />
        </Pane>
      );
    }

    if (error) {
      return <Pane>Error</Pane>;
    }

    return (
      <Pane padding={8}>
        {
          tickets.map(ticket => (
            <Ticket tripStartDate={ticket.startDate}
                    tripStartLocation={ticket.from}
                    tripEndDate={ticket.endDate}
                    tripEndLocation={ticket.to}
                    train={ticket.train}
                    wagon={ticket.wagon}
                    seat={ticket.seat}
                    onClick={() => this.showQrCodeDialog({
                      attachmentId: ticket.attachmentId,
                      messageId: ticket.messageId,
                    })}
            />
          ))
        }
        <Dialog
          isShown={showingQrCode}
          title="Tampere - Tikkurila"
          onCloseComplete={this.closeQrCodeDialog}
          hasFooter={false}
        >
          <Pane display="flex" alignItems="center" justifyContent="center">
            {
              qrCodeDataURI &&
                <img src={qrCodeDataURI} alt="QR code" height={150} width={150} />
            }
          </Pane>
        </Dialog>
      </Pane>
    );
  }
}
