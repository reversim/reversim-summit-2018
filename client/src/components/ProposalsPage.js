import React from 'react';
import { colors } from '../utils';
import Page from "./Page";
import {Col, Container, Row} from "reactstrap";
import {getSessionTypeStr} from "../utils";
import Tag from './Tag';
import Speaker from "./Speaker";
import SpeakerVertical from "./SpeakerVertical";
import heroImg from '../images/my-proposals.jpg';
import TagsList from './TagsList';

const ProposalItem = (proposal, i) => {
    const {title, type, speaker_ids, tags, abstract} = proposal;

    return <Row key={i}>
        <Col xs="10" sm={{ size: 7, offset: 1}} className="mb-4">
            <h4>{title}</h4>
            <p>{getSessionTypeStr(type)}</p>
            <div className="d-flex text-muted mb-3">{tags.map(Tag)}</div>
            <p>{abstract}</p>
        </Col>
        <Col xs="2" sm="3" className="mb-4 ml-4">
            {speaker_ids.map(speaker => <SpeakerVertical key={speaker._id} {...speaker} />)}
        </Col>
        </Row>
    };

const ProposalsPage = ({ filteredProposals, tags, filterByTags, ...props}) => {
  return <Page title="" {...props}>
  <div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}}/>
    <Container>
        <TagsList tags={tags} filterByTags={filterByTags} />
      <h1 className="text-center my-5">Reversim Summit 2018 - Proposals</h1>
      {filteredProposals.toJS().map(ProposalItem)}
    </Container>

  </Page>
};

export default ProposalsPage;