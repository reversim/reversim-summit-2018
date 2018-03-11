import { observable, extendObservable } from 'mobx';
import { getSessions, getProposals, getTeam, getProposal, getMe, getMessages, addMessage, removeMessage, getAllTags } from './data-service';
import uniqBy from 'lodash/uniqBy';
import flatMap from 'lodash/flatMap';
import { isServer } from './utils';

const store = observable({
  speakers: [],
  sessions: [],
	proposals: [],
	team: [],
	tags: [],
	get filteredProposals() {
		let filtered = [];
		if(!store.selectedTags.length) {
			filtered = store.proposals;
		} else {
			filtered = store.proposals.filter(proposal => {
				store.selectedTags.every(tag => proposal.tags.includes(tag));
			});
		}
		return filtered;
	},
	get selectedTags() { 
		return store.tags.filter(tag => tag.selected);
	},
	toggleTagState: (tag) => {
		let modifiedTag = store.tags.find(tag);
		modifiedTag.selected = !modifiedTag.selected;
	},
  messages: [],
  showTeamMember: null,
  onTeamMemberClick: id => {
    store.showTeamMember = store.showTeamMember === id ? null : id;
	},
  selectedDate: 0,
  setSelectedDate: i => store.selectedDate = i,
  isSmallScreen: window.innerWidth < 576,
  user: { isFetching: true },
  onLogout: () => store.user = { authenticated: false },
	getProposal: (id) => getProposal(id).then(proposal => {
		console.log("!!!", proposal ? proposal.id : '@@@');
    store.sessions = store.sessions.concat(processSession(proposal));
  }),
	isUploadingPhoto: false,
  onUploadingPhoto: () => {
    store.isUploadingPhoto = true;
  },
  onPhotoUploaded: (url) => {
    store.isUploadingPhoto = false;
    console.log("user", store.user);
    store.user = { ...store.user, picture: url };
    const speaker = store.speakers.find(x => x.id === store.user.id);
    if (speaker) speaker.picutre = url;
  },
  onAddMessage: (text) => {
    addMessage(text).then(msg => store.messages.push(msg));
  },
  onRemoveMessage: (id) => {
    const index = store.messages.findIndex(x => x._id === id);
    removeMessage(id).then(() => store.messages.splice(index, 1));
  }
});

const processSession = session => ({
	...session,
	speaker_ids: session.speaker_ids.map(speaker => ({
		...speaker,
		picture: speaker.picture.replace("/dtltonc5g/image/upload/", "/dtltonc5g/image/upload/w_300/"),
		get href() {
			return isServer ? `${speaker._id}.html` : speaker._id;
		}
	})),
	get href() {
		return isServer ? `${session.id}.html` : session.id;
	}
});

const filterSessions = sessionIds => sessionIds.map(p => store.sessions.find(session => session._id === p)).filter(x => !!x);

export async function initStore(initialState) {
	if (initialState) {
		extendObservable(store, initialState);
		return;
	}

  store.team = await getTeam();

  const sessions = await getSessions();
	const processedSessions = sessions.map(processSession);
	store.sessions = processedSessions;

	const proposals = await getProposals();
	store.proposals = proposals.map(processSession);
	// store.filteredProposals = [...store.proposals];

	const tags = await getAllTags();
	store.tags = tags.map(tag => {
		return {name: tag, selected: false}});

	store.speakers = uniqBy(flatMap(processedSessions, session => session.speaker_ids), x => x._id)
		.map(speaker => ({
			...speaker,
			sessions: filterSessions(speaker.proposals),
			get href() {
				return isServer ? `${speaker._id}.html` : speaker._id;
			}
		}))
		.sort((a, b) => {
			if (a.name === "Sheizaf Rafaeli") return -1;
			if (b.name === "Sheizaf Rafaeli") return 1;
			if (a.name === "Randy Shoup") return -1;
			if (b.name === "Randy Shoup") return 1;
			return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		});

	const user = await getMe();
  if (user.proposals) {
    user.sessions = filterSessions(user.proposals);
  }
	store.user = user;

	store.messages = await getMessages();
}

export default store;

if (!isServer) {
	initStore(window.__INITIAL_STATE__);
	window.__store = store;
}