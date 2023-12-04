import React, { Component } from 'react';
import Navigator from '../components/Navigator';
import Footer from '../components/Footer';

const IndexPage = ({ username }) => {
        const siteHeader = {
            backgroundImage: "url('/assets/TeamPose.png')",
            backgroundSize: "cover",
            backgroundPosition: "50% 20%",
            height: "250px"
        };
        return (
            <div>
                <Navigator username={username} />
                <div className="container-fluid min-vh-100 p-0">
                    <div style={siteHeader}>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <h1
                                className="display-4"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textShadow: '12px 24px 18px rgba(0, 0, 0, 0.9)',
                                    letterSpacing: '1px',
                                }}
                            >
                                Willkommen auf
                                <br />
                                <span
                                    style={{
                                        display: 'inline-block',
                                        transform: 'skew(-30deg)',
                                        fontWeight: 'bold',
                                        backgroundColor: '#fff',
                                    }}
                                >
                  <p
                      className="display-4 p-2"
                      style={{
                          fontWeight: 'bold',
                          transform: 'skew(30deg)',
                          color: '#000',
                          textShadow: 'none',
                      }}
                  >
                    PhoenixRPG
                  </p>
                </span>
                            </h1>
                        </div>
                    </div>
                    <div className="p-4 mb-5 bg-dark"></div>
                    <div className="container-fluid">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 mt-5">
                                    <h1 className="display-4" style={{ fontWeight: 'bold' }}>
                                        Informationen
                                    </h1>
                                </div>

                                <div className="col-12 mt-5 input-right shadow-lg">
                                    <div className="service-icon px-3">
                                        <i aria-hidden={true} className="fa-solid fa-people-group fa-3x"></i>
                                    </div>

                                    <div className="px-5 my-3 service-description">
                                        <h2 className="display-6" style={{ fontWeight: 'bold' }}>
                                            Über das Team
                                        </h2>
                                        <p className="fs-5">
                                            Das Projekt wurde umgestaltet zu einer kleinen Wissensdatenbank um den Umgang mittels
                                            NodeJS im Zusammenhang mit NextJS und ExpressJS zu lernen.

                                            Hierbei spielt ExpressJS eine signifikante Rolle im Backend zum Bereitstellen des
                                            Webservers, deren Routen und die REST API.

                                            Des Weiteren spielt NextJS (Server-side ReactJS) die Hauptrolle im Frontend.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 mt-5 input-right shadow-lg">
                                    <div className="service-icon px-3">
                                        <i aria-hidden={true} className="fas fa-server fa-3x"></i>
                                    </div>

                                    <div className="px-5 my-3 service-description">
                                        <h2 className="display-6" style={{ fontWeight: 'bold' }}>
                                            Aufstellung des Teams
                                        </h2>
                                        <p className="fs-5">
                                            Unser Team besteht derzeit aus aktiv 2 Personen,
                                            einem Fachinformatiker für Anwendungsentwicklung und
                                            einem Lehrer für Kunst und Technik
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 mt-5 input-right shadow-lg">
                                    <div className="service-icon px-3">
                                        <i aria-hidden={true} className="fas fa-lightbulb fa-3x"></i>
                                    </div>

                                    <div className="px-5 my-3 service-description">
                                        <h2 className="display-6" style={{ fontWeight: 'bold' }}>
                                            Planung der Zukunft
                                        </h2>
                                        <p className="fs-5">
                                            In Zukunft soll die Webseite mit einem besseren und größeren
                                            Wikipedia ausgestattet werden, so das Informationen von uns über
                                            eigene Themen, die uns interessieren, bereitgestellt werden können.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 mt-5 input-right shadow-lg">
                                    <div className="service-icon px-3">
                                        <i aria-hidden={true} className="fas fa-exclamation-circle fa-3x"></i>
                                    </div>

                                    <div className="px-5 my-3 service-description">
                                        <h2 className="display-6" style={{ fontWeight: 'bold' }}>
                                            Kontakt
                                        </h2>
                                        <p className="fs-5">
                                            Sollte man Interesse an Informationstechnologie, Anime, Serien und Spielen haben
                                            kann man sich gerne über <a href="http://discord.seraphimbuildings.de">Discord</a> bei uns melden!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid pb-5"></div>
                </div>
                <Footer username={username} />
            </div>
        );
}

export const getServerSideProps = async (context) => {
    const username = context?.query?.username || null;
    return {
        props: {
            username
        }
    }
}

export default IndexPage;
