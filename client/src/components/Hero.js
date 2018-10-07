import React from 'react';
import cn from 'classnames';
import {hero, heroInner, title, subtitle, headphones, left, separator} from './Hero.css';
import {Button} from 'reactstrap';
import {REVERSIM_SUMMIT} from '../utils';
import {Link} from 'react-router-dom';

const Hero = () => (
  <section className={cn(hero, 'd-flex justify-content-center align-items-center')}>
    <div className={cn(heroInner, 'd-flex align-items-center text-center text-md-left')}>
      <div className={cn(left, 'text-white')}>
        <h1 className={cn('mb-6 text-uppercase line-height-1', title)}>{REVERSIM_SUMMIT}</h1>
        <div className={cn(separator, 'border border-cyan mb-6 mx-auto mx-md-0')} />
        <div className={cn(subtitle, 'mb-8')}>8 - 9 October | Tel Aviv University</div>
        <div className="d-flex justify-content-center justify-content-md-start">
          {/* <a
            href="https://www.eventbrite.com/e/reversim-summit-2018-tickets-48220530906"
            target="_blank"
            rel="noopener noreferrer">
            <Button className="mr-4">Get tickets</Button>
          </a> */}
          <Link to="/schedule">
            <Button>View Schedule</Button>
          </Link>
        </div>
      </div>
      <div className={headphones} />
    </div>
  </section>
);

export default Hero;
