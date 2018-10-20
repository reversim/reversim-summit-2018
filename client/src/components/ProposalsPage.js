import React from 'react';
import Page from './Page';
import cn from 'classnames';
import {Col, Container, Row} from 'reactstrap';
import Session from './Session';
import values from 'lodash/values';

const TagFilter = ({text, isSelected, onClick}) => (
  <div
    onClick={onClick}
    className={cn(
      'font-size-sm letter-spacing cursor-pointer mr-2 mb-2 px-2 border-radius border',
      {'border-blue text-blue': !isSelected, 'bg-blue text-white border-transparent': isSelected},
    )}>
    {text}
  </div>
);

class ProposalsPage extends React.Component {
  state = {
    tagFilters: [],
    orderByTotal: false,
  };

  onTagClick = tag => {
    this.setState(state => {
      const index = state.tagFilters.indexOf(tag);
      if (index > -1) {
        return {
          tagFilters: state.tagFilters.slice(0, index).concat(state.tagFilters.slice(index + 1)),
        };
      } else {
        return {tagFilters: state.tagFilters.concat(tag)};
      }
    });
  };

  render() {
    const proposals = values(this.props.proposals);
    const {allTags, isSmallScreen, users} = this.props;

    const {tagFilters} = this.state;
    const tags = allTags
      .map(tag => ({text: tag, count: proposals.filter(p => p.tags.includes(tag)).length}))
      .sort((a, b) => (a.count > b.count ? -1 : 1));
    const tagStrs = tags.map(tag => `${tag.text} (${tag.count})`);
    const tagfilteredProposals = tagFilters.length
      ? proposals.filter(proposal => proposal.tags.some(tag => tagFilters.includes(tag)))
      : proposals;
    const filteredProposals = this.props.myVotes
      ? tagfilteredProposals.filter(proposal => proposal.attended)
      : tagfilteredProposals;
    const sortedProposals = this.state.orderByTotal
      ? filteredProposals.sort((a, b) => b.total - a.total)
      : filteredProposals;
    const showCount = sortedProposals.length;

    return (
      <Page title="Proposals" {...this.props}>
        <Container>
          <h1 className="mt-6 mb-12">Proposals</h1>
          <div className="mb-4">Showing {showCount} proposals</div>
          <Row>
            <Col>
              {sortedProposals.map(proposal => (
                <Session
                  isSmallScreen={isSmallScreen}
                  key={proposal._id}
                  proposal={proposal}
                  speakers={proposal.speaker_ids.map(speakerId => users[speakerId])}
                />
              ))}
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

export default ProposalsPage;
