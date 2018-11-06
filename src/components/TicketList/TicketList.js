import React, { Component } from 'react';
import { Pane, } from 'evergreen-ui';
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
    const { setLoading, setProgress } = this.context;

    setLoading(true);

    let errorCount = 0;
    let overallResultCount = 0;

    for await (const { resultType, result} of this.ticketFinder.findRelevantTickets()) {
      
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
}

TicketList.contextType = LoadingContext;

export default withGmailClient(TicketList);
