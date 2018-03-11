import React from 'react';
import cn from 'classnames';
import s from './SpeakerPage.css';
import SpeakerSocialLinks from "./SpeakerSocialLinks";
import {Link} from "react-router-dom";

const SpeakerVertical = (speaker) => {
  const { name, picture, oneLiner, href } = speaker;

  return <div className={cn("align-items-center my-4", s.speakerShort)}>
      <div className={s.speakerImg} style={{backgroundImage: `url('${picture}')`}}/>
      <Link to={`/speaker/${href}`}><h3>{name}</h3></Link>
      <div className="text-muted mb-2">{oneLiner}</div>
      <SpeakerSocialLinks {...speaker} className={cn(s.socialLinks, 'ml-0')}/>
  </div>
};

export default SpeakerVertical;