import { isServer } from '../utils';

const about =    { to: "about", text: "About" };
const register = { to: "register", text: "Register", noScroll: true };
const team =     { to: "team", text: "Team" };
const location = { to: "location", text: "Getting there", noScroll: true };
const speakers = { to: "speakers", text: "Speakers", noScroll: true };
const sponsors = { to: "sponsors", text: "Sponsors", noScroll: true };
const schedule = { to: "schedule", text: "Schedule", noScroll: true };
const proposals = { to: "proposals", text: "Proposals", noScroll: true };

export default (isHome) => {
	if (isServer) {
		return [
			speakers,
			schedule,
			location,
			sponsors
		].map(item => ({
			...item,
			external: true,
			to: `${item.to}.html`
		}));
	}

  let items = [
		about,
		register,
		speakers,
		schedule,
		location,
		team,
		sponsors,
		proposals
	];

  if (!isHome) {
    items = items.map(item => ({ noScroll: true, ...item }));
  }

  return items;
}