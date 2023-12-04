import React from 'react';
import Navigator from '../components/Navigator';
import Footer from '../components/Footer';

const ApplyInfoPage = ({ username }) => {
    return (
        <div>
            <Navigator username={username} />
            <div className="container-fluid min-vh-100 p-0">
                <div className="siteHeader">
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <h1 className="display-4 text-center" style={{ fontWeight: 'bold', color: '#fff', textShadow: '12px 24px 18px rgb(0 0 0 / 90%)', letterSpacing: '1px' }}>
              <span style={{ display: 'inline-block', transform: 'skew(-30deg)', fontWeight: 'bold', backgroundColor: '#fff' }}>
                <p className="display-4" style={{ fontWeight: 'bold', padding: '5px 40px', transform: 'skew(30deg)', color: '#000', textShadow: 'none' }}>
                  Bewerbung
                </p>
              </span>
                        </h1>
                    </div>
                </div>
                <div className="p-4 bg-dark"></div>
                <div className="container-fluid py-8 pb-5 h-25 d-inline-block">
                    <div className="container">
                        <div className="row">
                            <div className="col mt-5 input-right shadow-lg d-inline-block">
                                <div className="px-5 my-3 service-description">
                                    <article>
                                        <p>
                                            <b className="fs-2">Einführung</b><br />
                                            Herzlich Willkommen auf der Bewerbungsseite von PhoenixRPG.<br />
                                            Die Bewerbungsphase ist dauerhaft und man kann sich als folgendes bewerben:<br />
                                            - Content<br />
                                            - Developer<br />
                                            - Supporter<br />
                                            <br />
                                            Jede Angabe muss der <b>Wahrheit</b> entsprechend.<br />
                                            Mit * markiere Felder sind verpflichtend auszufüllen.
                                        </p>
                                        <hr />
                                        <p>
                                            <b className="fs-2">Content</b><br />
                                            Als Content bist Du beteiligt an der kreativen Gestaltung des Netzwerkes.<br />
                                            Sei es im Building-, Konzeptionierungs-, Storywriting-, Modelling- oder Skinmakerbereich.<br />
                                            <br />
                                            - Hohe Kreativität<br />
                                            - Hohe Eigeninitiative<br />
                                            - Guter Umgang mit den notwendigen Programmen<br />
                                        </p>
                                        <a className="btn btn-primary" href="/apply">Bewerben</a>
                                        <hr />
                                        <p>
                                            <b className="fs-2">Developer</b><br />
                                            Unter dem Developmentbereich gilt: Die Webentwicklung sowie die Java Entwicklung für den Minecraft Server (Spigot und Bungeecord)<br />
                                            <br />
                                            <b>Webentwicklung</b><br />
                                            - Weitreichende Erfahrungen mit HTML, CSS (mit Bootstrap), JavaScript<br />
                                            - Gute Erfahrungen mit NodeJS (mit Express) und NuxtJS<br />
                                        </p>
                                        <a className="btn btn-primary" href="/apply">Bewerben</a>
                                        <hr />
                                        <p>
                                            <b className="fs-2">Supporter</b><br />
                                            Unter dem Support Bereich versteht man die Interaktion mit dem User.<br />
                                            Als Supporter steht du in erster Linie mit Fragen und Kritik des Users in Kontakt.<br />
                                            <br />
                                            - Sehr Kommunikation<br />
                                            - Gute Deutsch- und Englischkenntnisse<br />
                                        </p>
                                        <a className="btn btn-primary" href="/apply">Bewerben</a>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer username={username} />
        </div>
    );
};

export async function getServerSideProps(context) {
    const username = context?.query?.username || null;
    return {
        props: {
            username
        },
    };
}

export default ApplyInfoPage;
