import React, {useState} from 'react';
import Navigator from '../components/Navigator';
import Footer from '../components/Footer';
import TipTapEditor from '../components/TipTapEditor';

const ApplyPage = ({ message, type, username }) => {
    const siteHeader = {
        backgroundImage: "url('/assets/BannerHaikali.png')",
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
                            className="display-4 text-center"
                            style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '12px 24px 18px rgba(0, 0, 0, 0.9)',
                                letterSpacing: '1px',
                            }}
                        >
              <span
                  style={{
                      display: 'inline-block',
                      transform: 'skew(-30deg)',
                      fontWeight: 'bold',
                      backgroundColor: '#fff',
                  }}
              >
                <p
                    className="display-4"
                    style={{
                        fontWeight: 'bold',
                        padding: '5px 40px',
                        transform: 'skew(30deg)',
                        color: '#000',
                        textShadow: 'none',
                    }}
                >
                  Bewerbung
                </p>
              </span>
                        </h1>
                    </div>
                </div>
                <div className="p-4 bg-dark"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 offset-md-2 p-3 mt-5 shadow-lg">
                            <div>
                                {message != null && (
                                    <span className={`form-control mb-4 text-white ${type ? 'bg-' + type : ''}`}>
                    {message}
                  </span>
                                )}
                            </div>
                            <form method="post" action="/apply">
                                <b className="fs-5">Persönliche Informationen</b>
                                <div className="input-group input-group-sm mb-1">
                                    <span className="input-group-text">Name*</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Name"
                                        id="Name"
                                        maxLength="32"
                                        required
                                    />
                                </div>
                                <div className="input-group input-group-sm mb-1">
                                    <span className="input-group-text">Minecraft-Name*</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="MinecraftName"
                                        id="MinecraftName"
                                        maxLength="16"
                                        placeholder="Steve"
                                        required
                                    />
                                </div>
                                <div className="input-group input-group-sm mb-1">
                                    <span className="input-group-text">Alter</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="Age"
                                        id="Alter"
                                        min="12"
                                        defaultValue="12"
                                    />
                                </div>
                                <div className="input-group input-group-sm mb-1">
                                    <span className="input-group-text">Discord*</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Discord"
                                        id="Discord"
                                        placeholder="Beispiel#1234"
                                        required
                                    />
                                </div>
                                <b className="fs-5">Informationen zu der Stellung</b>
                                <div className="input-group input-group-sm mb-1">
                                    <span className="input-group-text">Position*</span>
                                    <select
                                        name="Position"
                                        className="form-select form-select-sm"
                                        aria-label="form-select-sm example"
                                        required
                                    >
                                        <option value="">Wähle eine Position</option>
                                        <option value="Content">Content</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Supporter">Supporter</option>
                                    </select>
                                </div>
                                <div className="input-group input-group-sm mb-1">
                                    <span className="input-group-text">Portfolio</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Portfolio"
                                        id="Portfolio"
                                    />
                                </div>
                                <div className="mb-3">
                                    <span className="input-group-text my-2">Persönlche Vorstellung und Erfahrungen in der Position</span>
                                    <div>
                                        <TipTapEditor content={""} className="mb-2" />
                                    </div>
                                </div>
                                <div className="input-group input-group-sm text-center d-inline-block">
                                    <button type="submit" className="btn btn-primary px-5 p-3">
                                        <b>Bewerben</b>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer username={username} />
        </div>
    );
};

export async function getServerSideProps(context) {
    // Simulate data (replace this with your data retrieval logic)
    const message = context?.query?.message || null;
    const type = context?.query?.type || null;
    const username = context?.query?.username || null;

    return {
        props: {
            message,
            type,
            username,
        },
    };
}

export default ApplyPage;
