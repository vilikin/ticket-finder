import React, { Component } from 'react';
import { Pane, Text, Icon, Badge } from 'evergreen-ui';

export default class Ticket extends Component {
  render() {
    return (
      <Pane onClick={this.props.onClick} display="flex" flexDirection="column" elevation="1" padding={8}>
        <Pane display="flex" flex={1} flexDirection="row">
          <Pane display="flex" flex={1} alignItems="center" justifyContent="center" flexDirection="column">
            <Text fontWeight="bold">Tampere</Text>
            <Text size={500}>8:02</Text>
          </Pane>
          <Pane display="flex" flex={1} alignItems="center" justifyContent="center" flexDirection="column">
            <Text margin={4}>19.10.2018</Text>
            <Icon margin={4} icon="train" />
            <Text margin={4}>S42 / 6 / 125</Text>
          </Pane>
          <Pane display="flex" flex={1} alignItems="center" justifyContent="center" flexDirection="column">
            <Text fontWeight="bold">Tikkurila</Text>
            <Text size={500}>9:36</Text>
          </Pane>
        </Pane>
      </Pane>
    );
  }
}
