import React, { Component } from 'react';
import { Pane, Text, Icon } from 'evergreen-ui';
import * as moment from 'moment';
import { TicketRelevancy } from '../core/ticket-core';

function getTime(date) {
  return moment(date).format('HH:mm');
}

function getDate(date) {
  return moment(date).format('DD.MM.YYYY');
}

function relevancyToColor(relevancy) {
  switch (relevancy) {
    case TicketRelevancy.CURRENT:
      return '#47B881';
    case TicketRelevancy.UPCOMING:
      return '#D4EEE2';
    default:
      return '#66788A';
  }
}

export default class Ticket extends Component {
  render() {
    const {
      onClick,
      tripStartDate,
      tripEndDate,
      tripStartLocation,
      tripEndLocation,
      train,
      wagon,
      seat,
      relevancy,
      qrCodeDataURI,
    } = this.props;

    return (
      <Pane
        onClick={onClick}
        display="flex"
        flexDirection="row"
        elevation={1}
        padding={8}
        margin={12}
        borderBottom={`3px solid ${relevancyToColor(relevancy)}`}
      >
        <Pane
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Text fontWeight="bold">{tripStartLocation}</Text>
          <Text size={500}>{getTime(tripStartDate)}</Text>
        </Pane>

        <Pane
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Text margin={4}>{getDate(tripStartDate)}</Text>
          {
            relevancy === TicketRelevancy.CURRENT
              ? <img
                  src={qrCodeDataURI}
                  alt="QR Code"
                  width={133}
                  height={133}
                />
              : <Icon margin={4} icon="train" color='#00783E'/>
          }
          <Text margin={4}>{train} / {wagon} / {seat}</Text>
        </Pane>

        <Pane
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Text fontWeight="bold">{tripEndLocation}</Text>
          <Text size={500}>{getTime(tripEndDate)}</Text>
        </Pane>
      </Pane>
    );
  }
}
