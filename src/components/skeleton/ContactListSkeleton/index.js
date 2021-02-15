import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';

const ContactListSkeleton = ({ len = 10 }) => {
    let rows = [], i = 0;
    while (++i <= len) rows.push(i);

    const renderList = () => {
        return (
            rows.map((item, index) => {
                return (
                    <div className="nav-item skeleton" key={index}>
                        <div className="relative">

                            <Skeleton circle={true} height={45} width={45} />
                        </div>
                        <div className="contact-skeleton"><Skeleton height={20} width={200} /></div>
                    </div>
                )
            })
        )
    }
    return (
        <Fragment>
            <div className="chat-list"
                style={{ marginLeft: "5px" }}>
                <div className="navigation">
                    {renderList()}
                </div>
            </div>
        </Fragment>
    )
}

export default ContactListSkeleton
