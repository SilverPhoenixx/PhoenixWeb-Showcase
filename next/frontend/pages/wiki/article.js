import React, {useEffect, useRef} from 'react';
import Navigator from '../../components/Navigator';
import Footer from '../../components/Footer';

const WikiArticle = ({ loginUsername, title, content, headerURL, username, uuid }) => {

    const contentRef = useRef();

    return (
        <div>
            <Navigator username={loginUsername} />
            <div className="container-fluid min-vh-100 p-0">
                <div style={{height: "250px",   backgroundSize: "cover",
                    backgroundPosition: "center",  backgroundImage: `url(${headerURL})` }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <h1
                            className="display-4 text-center"
                            style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '12px 24px 18px rgb(0 0 0 / 90%)',
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
                  Artikel
                </p>
              </span>
                        </h1>
                    </div>
                </div>
                <div className="p-4 bg-dark"></div>
                <div className="container-fluid my-3">
                    <div className="row p-3 justify-content-center">
                        <div className="col-9 shadow-lg">
                            <div className="row">
                                <div className="col-12 centerImage" style={{ backgroundImage: `url(${headerURL})` }}></div>
                                <div className="col-12 pt-2">
                                    <b className="fs-3 pt-2">{title}</b>
                                </div>
                                <div className="col-12 d-flex">
                                    <img className="me-3" src={`https://cravatar.eu/helmavatar/${uuid}/50.png`} alt="Avatar" />
                                    <div className="d-flex flex-column align-baseline">
                                        <span className="d-block">Geschrieben von</span>
                                        <span className="fw-bold">{username}</span>
                                    </div>
                                </div>
                                <div className="col-12 pt-2 pb-4 content" ref={contentRef} dangerouslySetInnerHTML={{ __html: content }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer username={loginUsername} />
        </div>
    );
};

export const getServerSideProps = async (context) => {
    return {
        props: {
            loginUsername: context?.query?.username || null,
            title: context?.query?.data?.Title || null,
            content: context?.query?.data?.Content || null,
            headerURL: context?.query?.data?.HeaderURL || null,
            username: context?.query?.data?.Username || null,
            uuid: context?.query?.data?.UUID || null,
        }
    }
}

export default WikiArticle;
