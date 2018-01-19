import React from 'react';
import { colors } from '../utils';
import Page from "./Page";
import {Col, Container, Row} from "reactstrap";
import Speaker from "./Speaker";

const ProposalItem = (proposal, i) => {
    const tags = proposal.tags.toJS().map(tag => {
        return <label># {tag}</label>;
    });
    const speakers = proposal.speaker_ids.toJS().map(speaker => {
        return <Speaker {...speaker} color={colors[i%colors.length]} isFull={false}/>;
    });

    return <Row key={i}>
        <Col xs="10" sm={{ size: 7, offset: 1}} className="mb-4">
            <h4>{proposal.title}</h4>
            <label>{proposal.type}</label><div class="tags">{tags}</div>
            <p>{proposal.abstract}</p>
        </Col>
        <Col xs="2" sm="3" className="mb-4">
            {speakers}
        </Col>
        </Row>
    };

const ProposalsPage = ({ proposals, ...props}) => (
  <Page title="" {...props}>
    <Container>
      <h1 className="text-center my-5">Reversim Summit 2018 - Proposals</h1>
      {proposals.toJS().map(ProposalItem)}
    </Container>

  </Page>
);

export default ProposalsPage;