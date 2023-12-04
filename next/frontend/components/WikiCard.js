import React from 'react';

const WikiCard = ({ title, author, wikiDate, editPermission }) => {
    const wikiArticleLink = `/wiki/article?title=${title}`;
    const editLink = `/wiki/edit?title=${title}`;


    return (
        <div className="card">
            <a href={wikiArticleLink} className="text-decoration-none text-black">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p>Erstellt an: {wikiDate} von {author}</p>
                </div>
            </a>
            {editPermission && (
                <a href={editLink} className="text-decoration-none btn">
                    Bearbeiten
                </a>
            )}
        </div>
    );
};


export default WikiCard;
