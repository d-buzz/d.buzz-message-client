import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';

const ContactListSkeleton = (props) => {
    return (
        <Fragment>
            <div className="chat-list"
                style={{ marginLeft: "15px", lineHeight: 2, fontSize: 24 }}>
                <span><Skeleton count={8} width={500} /></span>
            </div>
        </Fragment>
    )
}

export default ContactListSkeleton
