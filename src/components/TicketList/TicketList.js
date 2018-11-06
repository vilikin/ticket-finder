import React, { Component } from 'react';
import { Pane, Icon, Text, Button } from 'evergreen-ui';
import Ticket from '../Ticket/Ticket';
import { TicketFinder, ResultType } from '../../core/ticket-core';
import { withGmailClient } from '../../utils/gmail-client';
import { getLoadingContext } from '../../utils/loading-context';

// Expected amount of yielded results
const EXPECTED_RESULT_COUNT = 2;

const LoadingContext = getLoadingContext();

// calculates a progress number for the progress bar
// from 0 to 1, based on count of loaded tickets
function calculateProgress(resultCount) {
  let currentExpectedResultCount = EXPECTED_RESULT_COUNT > resultCount
    ? EXPECTED_RESULT_COUNT
    : resultCount + 1;

  return resultCount / currentExpectedResultCount;
}

class TicketList extends Component {
  constructor(props) {
    super(props);

    this.ticketFinder = new TicketFinder(props.client);

    this.state = {
      error: null,
      tickets: [],
    };
  }

  async componentDidMount() {
    this.fetchTickets(2);
  }

  fetchTickets = async (nonRelevantSubsequentTicketTolerance) => {
    const { setLoading, setProgress } = this.context;
    const { findRelevantTickets } = this.ticketFinder;

    setLoading(true);

    let errorCount = 0;
    let overallResultCount = 0;

    for await (
      const { resultType, result} of findRelevantTickets(nonRelevantSubsequentTicketTolerance)
    ) {
      if (resultType === ResultType.TICKET) {
        this.setState({
          tickets: [ ...this.state.tickets, result],
        });
      }

      if (resultType === ResultType.ERROR) {
        errorCount++;
      }

      overallResultCount++;
      const progress = calculateProgress(overallResultCount);
      setProgress(progress);
    }

    setProgress(1);

    setTimeout(() => setLoading(false), 500);

    console.log(`Finished fetching relevant tickets with ${errorCount} error(s).`);
  }

  render() {
    const { tickets } = this.state;
    const { loading } = this.context;

    if (loading || tickets.length > 0) {
      return this.renderTickets(tickets);
    } else {
      return this.renderNotFound();
    }
  }

  renderTickets(tickets) {
    return (
      <Pane marginX={8} marginTop={2}>
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

  renderNotFound = () => {
    return (
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        height="calc(100vh - 70px)"
      >
        <Icon icon="flag" size={60} color="success"/>
        <Text color="muted" marginTop={16} marginX={30} align="center">
        </Text>
        <Text color="muted" marginTop={16} marginX={30} align="center">
          I couldn't find any relevant tickets from your inbox. That might just be my bad: consider using the Gmail app to find the ticket. If you'd like, I can also try dig deeper in your inbox.
        </Text>
        <Button marginTop={16}>
          Try harder
        </Button>
      </Pane>
    );
  }
}

TicketList.contextType = LoadingContext;

export default withGmailClient(TicketList);
