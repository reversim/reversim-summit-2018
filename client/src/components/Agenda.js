import React from 'react';
import Page from './Page';
import {Container, Row, Col} from 'reactstrap';
import s from './Agenda.css';
import cn from 'classnames';
import {agenda1, agenda2} from '../data/agenda';
import {Link} from 'react-router-dom';
import CalendarLink from './CalendarLink';
import {isServer, getHref} from '../utils';
import withFilters from './withFilters';
import Tag from './Tag';
import halls from '../data/halls';

const _getSession = (sessions, id) => sessions[id];
const getSession = (sessions, id) => {
  if (id.sessions) return {...id, sessions: id.sessions.map(x => _getSession(sessions, x))};
  else return _getSession(sessions, id);
};

const getSpeakerName = (session, users) =>
  session.speaker_ids.map(ss => users[ss].name).join(' & ');
const getSpeakerPicture = (session, users) => session.speaker_ids.map(ss => users[ss].picture);
const getSessionImgs = (session, users) =>
  getSpeakerPicture(session, users).map((url, i) => (
    <div
      key={i}
      className={cn('mr-2a', s.speakerImg)}
      style={{backgroundImage: `url('${url}')`, marginLeft: i > 0 ? -10 : 0}}
    />
  ));

const _Time = t => <span>{t}</span>;

const Time = ({tStr}) => {
  if (tStr.indexOf('-') > -1) {
    const [t1, t2] = tStr.split('-');
    return (
      <div className="font-mono">
        {t1} &mdash; {t2}
      </div>
    );
  } else {
    return <div className="font-mono">{tStr}</div>;
  }
};

const ShortSessions = ({sessions, users}) => (
  <div className="mt-3">
    {sessions.map((ss, i) => (
      <div className={cn('mb-3 pb-2', {[s.igniteSep]: i < sessions.length - 1})} key={i}>
        <Link to={`/session/${getHref(ss)}`}>
          <div className="d-flex">
            <div className="d-flex">{getSessionImgs(ss, users)}</div>
            <div className={s.igniteContent}>
              <h5 className={cn('mr-4 mb-0 font-size-sm', s.igniteName)}>
                {getSpeakerName(ss, users)}
              </h5>
              <div>{ss.title}</div>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
);

const Session = ({text, session, shortSessions, hall, sep, users}) => {
  let content;
  if (session && session.sessions) {
    content = (
      <div>
        {session.text && <div className={s.tall}>{session.text}</div>}
        {hall && (
          <div className="d-lg-none text-muted">
            <i className="fa fa-map-marker mr-2" />
            {hall}
          </div>
        )}
        <ShortSessions sessions={session.sessions} users={users} />
      </div>
    );
  } else if (session) {
    content = (
      <Link to={`/session/${getHref(session)}`}>
        <div className="d-flex align-items-center">
          <div className="flex-1">
            <div className="font-size-sm">{getSpeakerName(session, users)}</div>
            <div className="font-weight-heavy">{session.title}</div>
            <div className="d-flex flex-wrap">{session.tags.map(Tag)}</div>
          </div>
          <div className="d-flex">{getSessionImgs(session, users)}</div>
        </div>
      </Link>
    );
  } else if (shortSessions) {
    content = (
      <div>
        <ShortSessions sessions={shortSessions} users={users} />
      </div>
    );
  }

  return (
    <div
      className={cn('agenda-session d-flex')}
      style={{borderBottom: sep ? '1px solid rgba(255,255,255,0.2)' : ''}}>
      <div className="agenda-session__hall" style={{display: `${hall ? 'auto' : 'none'}`}}>
        {hall}
      </div>
      <div className="flex-1">
        {text && (
          <div style={{fontSize: 24}} className="font-weight-bold">
            {text}
          </div>
        )}
        {content}
      </div>
    </div>
  );
};

const Line = ({
  time,
  sessions,
  text,
  href,
  shortSessions,
  allSessions,
  users,
  excludedHalls = [],
}) => {
  let cols;
  if (Array.isArray(sessions)) {
    cols = sessions
      .map((sessionId, i) => ({
        sessionId,
        hall: halls[i],
        i,
      }))
      .filter(({sessionId, i}) => sessionId && !excludedHalls.includes(i))
      .map(({sessionId, hall}, i, filteredSessions) => (
        <Session
          key={i}
          session={sessionId && getSession(allSessions, sessionId)}
          hall={hall}
          sep={i < filteredSessions.length - 1}
          users={users}
        />
      ));
    if (!cols.length) cols = null;
  } else if (typeof sessions === 'string') {
    cols = !excludedHalls.includes(0) && (
      <Session
        text={text}
        session={getSession(allSessions, sessions)}
        hall={halls[0]}
        users={users}
      />
    );
  } else if (shortSessions) {
    cols = !excludedHalls.includes(0) && (
      <Session
        text={text}
        shortSessions={shortSessions.map(ss => getSession(allSessions, ss))}
        hall={halls[0]}
        users={users}
      />
    );
  } else {
    cols = <Session text={text} />;
  }

  if (href && cols) {
    if (isServer) href = `${href}.html`;
    cols = <Link to={href}>{cols}</Link>;
  }

  return (
    cols && (
      <div>
        <div className="d-flex align-items-center">
          <div className="pr-3">
            <Time tStr={time} />
          </div>
          <div className="border-top border-white flex-1" />
        </div>
        <div className="d-flex flex-wrap">
          <div className="agenda-line-spacer" style={{flex: '0 0 140px'}} />
          <div className="flex-1">{cols}</div>
        </div>
      </div>
    )
  );
};

const dates = ['Day 1 October 8th', 'Day 2 October 9th'];

const agendas = [agenda1, agenda2];

const DayAgenda = ({index, sessions, isLargeScreen, users, excludedHalls}) => {
  return (
    <div className={cn(s.agenda, 'mb-5')}>
      <h2 className={cn(s.subtitle, 'font-size-xl font-weight-heavy')}>{dates[index]}</h2>
      <div className="bg-emph pt-4 p-3" style={{marginTop: -20}}>
        {agendas[index].map((line, i) => (
          <Line
            key={i}
            {...line}
            allSessions={sessions}
            isLargeScreen={isLargeScreen}
            users={users}
            excludedHalls={excludedHalls}
          />
        ))}
      </div>
    </div>
  );
};

const _AddToCal = () => (
  <div className="text-center mt-5">
    <CalendarLink />
  </div>
);

class Agenda extends React.Component {
  render() {
    const {
      proposals,
      users,
      setExcludedDay,
      setExcludedHall,
      excludedHalls,
      excludedDays,
    } = this.props;
    if (!proposals || !Object.keys(proposals).length) return null;

    return (
      <Page title="Schedule" {...this.props}>
        <Container>
          <h1 className="mb-4 font-weight-bold">Schedule</h1>
          {/* <AddToCal /> */}
          {!excludedDays.includes(0) && (
            <DayAgenda index="0" sessions={proposals} users={users} excludedHalls={excludedHalls} />
          )}
          {/*<h4 className={cn("text-center", s.subtitle)} style={{margin:'80px 0'}}>Day 1 is over, check out day 2 bellow</h4>*/}
          {!excludedDays.includes(1) && (
            <DayAgenda index="1" sessions={proposals} users={users} excludedHalls={excludedHalls} />
          )}
        </Container>
      </Page>
    );
  }
}

const {Comp: AgendaWithFilters, HallFilter, DayFilter} = withFilters(Agenda, 'agenda');

export default AgendaWithFilters;
