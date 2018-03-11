import React from 'react';
import cn from 'classnames';
import s from './TagsList.css';

const clickableTag = (tag, clickHandler) => {
    const toggleTagSelection = () => {
        tag.selected = !tag.selected;
        console.log('hello');
    };

    return <div key={tag.name} onClick={toggleTagSelection} className={cn("mr-3", { [s.active]: tag.selected })}>
            #{tag.name}
        </div>
};

const TagsList = ({tags, filterByTags, ...props}) => {
    let selectedTags = [];

    const clickHandler = (tag) => {
        if(selectedTags.indexOf(tag) !== -1) {
            selectedTags.splice(selectedTags.indexOf(tag), 1);
        } else {
            selectedTags.push(tag);
        }
        filterByTags(selectedTags);
    }
    return <div>
            {tags.map(tag => clickableTag(tag, clickHandler))}
        </div>
}

export default TagsList;