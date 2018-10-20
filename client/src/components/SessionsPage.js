import React, {Fragment} from 'react';
import Page from './Page';
import values from 'lodash/values';
import {Container, Row, Col} from 'reactstrap';
import {TAG_COLORS} from '../data/proposals';
import {getDateAndTime} from './SessionDayTime';
import withFilters from './withFilters';
import intersection from 'lodash/intersection';
import Session from './Session';

const FilterHeader = ({text, isCollapsed, onClick}) => (
  <div
    className="border-cyan font-size-md pb-2 mb-4 d-flex justify-content-between cursor-pointer"
    style={{borderBottomWidth: 2, borderBottomStyle: 'solid'}}
    onClick={onClick}>
    {text}
    <i className={`fa fa-chevron-${isCollapsed ? 'up' : 'down'} text-cyan`} />
  </div>
);

class SessionsPage extends React.Component {
  state = {
    dayCollapsed: false,
    hallCollapsed: false,
    sessionTypeCollapsed: false,
    tagCollapsed: false,
  };

  render() {
    const {
      isSmallScreen,
      users,
      setExcludedDay,
      excludedDays,
      setExcludedHall,
      excludedHalls,
      setExcludedSessionTypes,
      excludedSessionTypes,
      setExcludedTags,
      excludedTags,
    } = this.props;

    const proposals = this.props.sessions
      .map(proposalId => this.props.proposals[proposalId])
      .filter(proposal => {
        const {day, hall} = getDateAndTime(proposal._id);

        return (
          !excludedDays.includes(day) &&
          !excludedHalls.includes(hall) &&
          !excludedSessionTypes.includes(proposal.type) &&
          !intersection(excludedTags, proposal.tags.map(tag => tag.toLowerCase())).length
        );
      });

    return (
      <Page title="Sessions" {...this.props}>
        <Container>
          <h1 className="mt-6 mb-12">Sessions</h1>

          <div className="mb-4">
            {proposals.length ? `Showing ${proposals.length} sessions` : '\u00A0'}
          </div>

          <Row>
            <Col>
              {proposals.length ? (
                proposals.map(proposal => (
                  <Session
                    isSmallScreen={isSmallScreen}
                    key={proposal._id}
                    proposal={proposal}
                    speakers={proposal.speaker_ids.map(speakerId => users[speakerId])}
                  />
                ))
              ) : (
                <span className="font-mono font-size-xl">Nothing to show :-(</span>
              )}
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

const {
  Comp: SessionsPageWithFilters,
  HallFilter,
  DayFilter,
  SessionTypeFilter,
  TagFilter,
} = withFilters(SessionsPage, 'sessions');

export default SessionsPageWithFilters;
