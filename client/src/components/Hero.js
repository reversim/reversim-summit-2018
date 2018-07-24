import React from 'react';
import cn from 'classnames';
import {hero, heroInner, title, subtitle, headphones, left, separator} from './Hero.css';
import {Button} from 'reactstrap';
import {REVERSIM_SUMMIT} from '../utils';

const Hero = () => (
  <section className={cn(hero, 'd-flex justify-content-center align-items-center')}>
    <div className={cn(heroInner, 'd-flex align-items-center')}>
      <div className={cn(left, 'text-white')}>
        <h1 className={cn('font-weight-bold mb-6 text-uppercase line-height-1', title)}>
          {REVERSIM_SUMMIT}
        </h1>
        <div className={cn(separator, 'border border-cyan mb-6')} />
        <div className={cn(subtitle, 'mb-8')}>8 - 9 October | Tel Aviv University</div>
        <div className="d-flex">
          <Button size="lg" className="mr-4">
            Get tickets
          </Button>
          <Button size="lg">View Agenda</Button>
        </div>
      </div>
      <div className={headphones} />
    </div>
  </section>
);

export default Hero;
