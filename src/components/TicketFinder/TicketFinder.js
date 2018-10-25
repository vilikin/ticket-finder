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

    const attachmentId = 'ANGjdJ8pbNgZKhxP45a72rix_JFTMub4ubpKIgTKYS0_QTjupaJLEZ-wVsleHarVeXQ3yokNP9gCQj2KJUBeskyzWFzP8cWv1gnAtjSMYbJRs8qtqzTeEY8jm0tQ9hg3KK93tSsXoxljvmCMkM9J2EpO04SNE_MbqsjbmeJLhC6fVs8GTQJNPit0YHPV3cBsOZhnDuMeqBbLtqF78V_PiPrY77e2pnSPRT72sZZO6f114Lvz3tGltYPBOram8d_BkM_MD-mkM6Qhqlj-uHVTIskLgZwiP3K-Mzm4upFeHvlmPY3Pe1PDTS83WcBRGBTKeAl32Y0b9x3yoy7fUsD-5_Xl9AumW4ZasWIS1WrDqw-rJCTROH8Pn3wT5u_rIQFL-2Epgf6bLFpulJHbKBlL';
    const messageId = '166a0b135378370c';

    return loading ?
      <Pane display="flex" alignItems="center" justifyContent="center" height="90vh">
        <Spinner />
      </Pane>
      :
      error ?
        <Pane>Error</Pane>
        :
        <Pane padding={8}>
          <Ticket onClick={() => this.showQrCodeDialog({
            attachmentId,
            messageId,
          })}/>
          {
            tickets.map(ticket => (
              <Pane margin={8}>
                {JSON.stringify(ticket)}
              </Pane>
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
        </Pane>;
  }
}
