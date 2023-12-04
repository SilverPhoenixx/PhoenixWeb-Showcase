import React from 'react';

class TeamUsers extends React.Component {
    render() {
        const { team } = this.props;

        return (
            <div className="container">
                <div className="row align-items-center text-center gx-3 justify-content-center">
                    {team && (
                        <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-1 py-3 justify-content-center">
                            {Object.values(team).map(user => (
                                <div key={user.UUID} className="col bg-gray shadow-lg pt-3 rounded-lg m-3 py-3">
                                    <img src={`https://crafatar.com/renders/head/${user.UUID}`} alt={`Skin von ${user.Name}`} className="mx-auto d-block img-fluid" />
                                    <h5 className="fs-5 fw-semibold text-info">{user.Name}</h5>
                                    <div className="text-white-50">{user.Role}</div>
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            {user.Abilities.map(ability => (
                                                <span key={ability} className="col bg-black px-3 rounded-pill text-white d-inline m-1">{ability}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default TeamUsers;
