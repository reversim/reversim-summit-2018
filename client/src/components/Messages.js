import React from 'react';
import cn from 'classnames';
import Section from "./Section";
import s from './Messages.css';

const Messages = ({ messages }) => {
	if (messages.length) {
		return <Section title="Messages">
			<ul className={cn(s.messages, "font-size-lg")}>
				{messages.map(msg => (
					<li key={msg._id} className={s.message}><i className="fa fa-info-circle mr-3"/>{msg.text}</li>
				))}
			</ul>
		</Section>
	} else {
		return null;
	}
};

export default Messages;