import React from 'react';
import { colors } from '../utils';
import Page from "./Page";
import {Col, Container, Row} from "reactstrap";
import {getSessionTypeStr} from "../utils";
import Tag from './Tag';
import Speaker from "./Speaker";
import SpeakerShort from "./SpeakerShort";

const generateSpeakers = (speakerArr, i) => {
    return speakerArr.map(speaker => {
        return <Speaker {...speaker} color={colors[i%colors.length]} isFull={false}/>;
    });
}

const ProposalItem = (proposal, i) => {
    const {title, type, speaker_ids, tags, abstract} = proposal;

    // const speakers2 = generateSpeakers(proposal.speaker_ids.toJS(), i);

    return <Row key={i}>
        <Col xs="10" sm={{ size: 7, offset: 1}} className="mb-4">
            <h4>{title}</h4>
            <p>{getSessionTypeStr(type)}</p>
            <div className="d-flex text-muted mb-3">{tags.map(Tag)}</div>
            <p>{abstract}</p>
        </Col>
        <Col xs="2" sm="3" className="mb-4 ml-4">
            {speaker_ids.map(SpeakerShort)}
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