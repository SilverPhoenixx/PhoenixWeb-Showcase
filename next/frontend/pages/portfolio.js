import React from 'react';
import Navigator from '../components/Navigator';
import PortfolioImages from '../components/PortfolioImages';
import Footer from '../components/Footer';

const PortfolioPage = ({ username, images }) => {
    const siteHeader = {
        backgroundImage: "url('/assets/SkyWhale.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "250px"
    };
    return (
        <div>
            <Navigator username={username} />
            <div style={siteHeader}>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div>
                        <h1
                            className="display-4"
                            style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '12px 24px 18px rgb(0 0 0 / 90%)',
                                letterSpacing: '1px',
                            }}
                        >
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
                    MC Portfolio

                </p>
              </span>
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container-fluid min-vh-100 bg-dark">
                <PortfolioImages images={images} />
            </div>
            <Footer username={username} />
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const username = context?.query?.username || null;
    return {
        props: {
            username,
            images: context?.query?.images,
        }
    }
}

export default PortfolioPage;
