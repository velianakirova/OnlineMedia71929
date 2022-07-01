import React from "react";
import GroupItem from "./GroupItem";
import './GroupsList.css'

const GroupsList = ({ groups, ...props }) => {
    return (
        <ul className="GroupsList-items">
            {groups.sort((firstGroup, secondGroup) => new Date(firstGroup.created) - new Date(secondGroup.created))
                .map(group => (
                    <div>
                        <GroupItem group={group} {...props} />
                    </div>
                ))}
        </ul>
    )
}

export default GroupsList;