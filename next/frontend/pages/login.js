import React from 'react';
import Navigator from '../components/Navigator';
import Footer from '../components/Footer';

const LoginPage = ({ username, message }) => {

    const siteHeader = {
        backgroundImage: "url('/assets/b7.jpg')",
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
                        <h1 className="display-4 text-center" style={{ fontWeight: 'bold', color: '#fff', textShadow: '12px 24px 18px rgb(0 0 0 / 90%)', letterSpacing: '1px' }}>
              <span style={{ display: 'inline-block', transform: 'skew(-30deg)', fontWeight: 'bold', backgroundColor: '#fff' }}>
                <p className="display-4" style={{ fontWeight: 'bold', padding: '5px 40px', transform: 'skew(30deg)', color: '#000', textShadow: 'none' }}>
                  Login
                </p>
              </span>
                        </h1>
                    </div>
                </div>
                <div className="p-4 bg-dark"></div>
                <div className="container-fluid py-8 my-5 h-25 d-inline-block ">
                    <div className="row">
                        <div className="col-6 mx-auto my-5 shadow-lg">
                            <div className="px-5 my-3 service-description">
                                <p className="text-center display-6 fw-bold">Login</p>
                                {message !== null && (
                                    <span className="form-control bg-danger mb-4 text-white">{message}</span>
                                )}
                                <form method="post" action="./login">
                                    <div className="form-group">
                                        <span className="form-group-text">E-Mail</span>
                                        <input
                                            autoComplete="email"
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="max@mustermann.de"
                                            required
                                        />
                                        <span className="form-group-text">Password</span>
                                        <input
                                            autoComplete="password"
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            required
                                        />
                                        <input
                                            type="submit"
                                            value="Login"
                                            className="form-control btn btn-primary my-4"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer username={username} />
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const username = context?.query?.username || null;
    const message = context?.query?.message || null;
    return {
        props: {
            username,
            message
        }
    }
}

export default LoginPage;
