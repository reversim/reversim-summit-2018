import React, {Fragment} from 'react';
import {Container, Button} from 'reactstrap';
import {img, body, homepageImg, homepageBody} from './Speaker2.css';
import cn from 'classnames';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import sampleSize from 'lodash/sampleSize';
import {Link} from 'react-router-dom';
import {getHref} from '../utils';

const Speaker = ({speaker}) => {
  const {name, oneLiner, picture, twitter, github, linkedin, stackOverflow} = speaker;
  return (
    <Fragment>
      <Link to={`/speaker/${getHref(speaker)}`} className="text-white unstyled-link">
        <div
          style={{backgroundImage: `url('${picture}')`}}
          alt={name}
          className={cn(img, homepageImg)}
        />
      </Link>
      <div className={cn(body, homepageBody, 'ml-4 pt-8 pb-4 px-2 bg-emph')}>
        <Link to={`/speaker/${getHref(speaker)}`} className="text-white unstyled-link">
          <div className="speaker-name font-weight-heavy mb-3" style={{letterSpacing: 0.5}}>
            {name}
          </div>
          <div className="speaker-oneliner font-size-sm mb-6">{oneLiner}</div>
        </Link>
        <SpeakerSocialLinks {...{twitter, github, linkedin, stackOverflow}} />
      </div>
    </Fragment>
  );
};

const SpeakersSection = props => {
  const speakers = sampleSize(props.speakers, 6).map(s => props.users[s]);
  return (
    <section className="mb-20 mt-12 mt-md-0">
      <Container>
        <h1 className="mb-14 row-margin-fix">Speakers</h1>
        <div className="speakers-section__speakers-wrapper d-flex flex-wrap row-margin-fix">
          {speakers.map((speaker, i) => (
            <div className={cn('mb-18')} key={i}>
              <Speaker speaker={speaker} />
            </div>
          ))}
        </div>
        <div className="d-flex align-items-center mt-2">
          <div className="border border-cyan mr-4 flex-1" />
          <a href="/speakers">
            <Button>View all speakers</Button>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default SpeakersSection;
