import {createElement} from 'react';
import {getInitialData} from './data-service';
import {renderToString} from 'react-dom/server';
import routes from './data/routeComps';
import fs from 'fs';
import {resolve} from 'path';
import without from 'lodash/without';
import AppStatic from './components/AppStatic';
import './sass/bootstrap.scss';

process.on('unhandledRejection', err => {
  throw err;
});

const indexHTML = fs
  .readFileSync(resolve(__dirname, '../static/template.html'))
  .toString()
  .replace('<script type="text/javascript" src="render.js"></script>', '');

getInitialData().then(store => {
  console.log('fetched initial data');
  store.fetchComplete = true;
  store.shuffledSpeakers = without(
    store.speakers,
    '5b60af7eb5c7a00014aaff91',
    '5b45baa6990eba0014f62e39',
  );
  routes.forEach(({path, comp: _comp}) => {
    if (path === '/speaker/:id') {
      const {users} = store;
      Object.keys(users).forEach(userId => {
        renderFile(`/speaker/${userId}`, `${userId}.html`, 'speaker');
      });
    } else if (path === '/session/:id') {
      const {proposals} = store;
      Object.keys(proposals).forEach(proposalId => {
        renderFile(`/session/${proposalId}`, `${proposalId}.html`, 'session');
      });
    } else {
      const filename = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
      renderFile(path, filename);
    }
  });

  function renderFile(path, filename, folder = '') {
    console.log('rendering', path);
    let html = renderToString(createElement(AppStatic, {...store, location: path}));
    html = indexHTML.replace('<!--ssr-->', html);
    fs.writeFileSync(resolve(__dirname, '../static', folder, filename), html);
  }
});
