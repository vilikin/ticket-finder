import React, { Component } from 'react';
import { Pane, Text, Icon } from 'evergreen-ui';
import * as moment from 'moment';

function getTime(date) {
  return moment(date).format('HH:mm');
}

function getDate(date) {
  return moment(date).format('DD.MM.YYYY');
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
    } = this.props;

    return (
      <Pane onClick={onClick} display="flex" flexDirection="row" elevation={1} padding={8} margin={12} borderBottom='3px solid #47B881'>
        <Pane display="flex" flex={1} alignItems="center" justifyContent="center" flexDirection="column">
          <Text fontWeight="bold">{tripStartLocation}</Text>
          <Text size={500}>{getTime(tripStartDate)}</Text>
        </Pane>
        <Pane display="flex" flex={1} alignItems="center" justifyContent="center" flexDirection="column">
          <Text margin={4}>{getDate(tripStartDate)}</Text>
          <Icon margin={4} icon="train" color='#00783E'/>
          <Text margin={4}>{train} / {wagon} / {seat}</Text>
        </Pane>
        <Pane display="flex" flex={1} alignItems="center" justifyContent="center" flexDirection="column">
          <Text fontWeight="bold">{tripEndLocation}</Text>
          <Text size={500}>{getTime(tripEndDate)}</Text>
        </Pane>
      </Pane>
    );
  }
}
