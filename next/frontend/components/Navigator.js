import React from 'react';

const Navigator = ({ username }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a href="/" className="navbar-brand p-0">
                    <img
                        src="/assets/Logo.png"
                        className="img-fluid"
                        width={64}
                        alt="PhoenixBrand"
                    />
                </a>
                <button
                    type="button"
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav px-8">
                        <li>
                            <a href="/" className="nav-item nav-link px-4 fs-4">
                                <i aria-hidden={true} className="fas fa-home"> Home</i>
                            </a>
                        </li>
                        <li>
                            <a href="/team" className="nav-item nav-link px-4 fs-4">
                                <i aria-hidden={true} className="fas fa-users"> Team</i>
                            </a>
                        </li>
                        <li>
                            <a href="/portfolio" className="nav-item nav-link px-4 fs-4">
                                <i aria-hidden={true} className="fas fa-image"> Portfolio</i>
                            </a>
                        </li>
                        <li>
                            <a href="/wiki" className="nav-item nav-link px-4 fs-4">
                                <i aria-hidden={true} className="fas fa-book"> Wiki</i>
                            </a>
                        </li>
                        <li>
                            {username !== null && (
                                <div className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle px-4 fs-4"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i aria-hidden={true} className="fa-solid fa-user"> Profil</i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="/profil">
                                                Profil
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/worlds?page=1">
                                                Welten
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <a href="/logout" className="dropdown-item text-danger">
                                            <i aria-hidden={true} className="fa-solid fa-right-from-bracket text-danger">
                                                {' '}
                                                Logout
                                            </i>
                                        </a>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigator;
