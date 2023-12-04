import React from 'react';

const Footer = ({ username }) => {

    return (
        <footer className="bg-dark text-center text-white">
            <div className="container p-4 pb-0">
                <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/SilverPhoenixx">
                    <i aria-hidden={true} className="fab fa-github"></i>
                </a>
                {username === null && (
                    <a className="btn btn-outline-light btn-floating m-1" href="/login">
                        Login
                    </a>
                )}
            </div>

            <div className="text-center p-3">
                PhoenixRPG
            </div>
        </footer>
    );
};

export default Footer;
