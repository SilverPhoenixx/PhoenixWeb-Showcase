import React from 'react';
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";

const ProfilePage = ({ loginUsername, username, uuid, role }) => {
    const siteHeader = {
        backgroundImage: "url('/assets/b7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "250px"
    };


    const currentPassword = React.createRef();
    const oldPassword = React.createRef();
    const password = React.createRef();
    const passwordRepeat = React.createRef();
    const email = React.createRef();
    const emailRepeat = React.createRef();

    const emailResponseMessage = React.createRef();
    const passwordResponseMessage = React.createRef();

    const changePassword = () => {
        if (oldPassword.current.value && password.current.value && passwordRepeat.current.value) {
            fetch("./user/setpassword", {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({
                    "oldpassword": oldPassword.current.value,
                    "password": password.current.value,
                    "passwordRepeat": passwordRepeat.current.value
                })
            })
                .then(res => res.json())
                .then(data => {
                    passwordResponseMessage.current.innerHTML = data["Message"];
                    passwordResponseMessage.current.removeAttribute("hidden");
                    if (data["State"] === "200") {
                        passwordResponseMessage.current.className = "form-control mb-4 text-white bg-success";
                    } else if (data["State"] === "400") {
                        passwordResponseMessage.current.className = "form-control mb-4 text-white bg-danger";
                    }
                });
        }
    };

   const changeEmail = () => {
        if (currentPassword.current.value && email.current.value && emailRepeat.current.value) {
            fetch("./user/setemail", {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({
                    "currentpassword": currentPassword.current.value,
                    "email": email.current.value,
                    "emailRepeat": emailRepeat.current.value
                })
            })
                .then(res => res.json())
                .then(data => {
                    emailResponseMessage.current.innerHTML = data["Message"];
                    if (data["State"] === "200") {
                        emailResponseMessage.current.className = "form-control mb-4 text-white bg-success";
                    } else if (data["State"] === "400") {
                        emailResponseMessage.current.className = "form-control mb-4 text-white bg-danger";
                    }
                });
        }
    };

    return(
            <div>
                <Navigator username={loginUsername} />
                <div className="container-fluid min-vh-100 p-0">
                    <div style={siteHeader}>
                        <div className="d-flex justify-content-center align-items-center h-100">
              <span style={{ display: "inline-block", transform: "skew(-30deg)", fontWeight: "bold", backgroundColor: "#fff" }}>
                <p className="display-4" style={{ fontWeight: "bold", padding: "5px 40px", transform: "skew(30deg)", color: "#000", textShadow: "none" }}>
                  Profil
                </p>
              </span>
                        </div>
                    </div>
                    <div className="p-4 bg-dark"></div>
                    <div className="container-fluid py-4 my-5 h-25 d-inline-block">
                        <div className="container-fluid mb-5">
                            <div className="row">
                                <div className="col-9 mx-auto my-5 shadow-lg">
                                    <div className="px-5 my-3 service-description">
                                        <p className="text-center display-6 fw-bold">
                                            {username}
                                        </p>
                                    </div>
                                    <img src={`https://visage.surgeplay.com/full/${uuid}`} className="mx-auto d-block" alt={`Skin von ${username}`} />
                                    <p className="text-center fs-4 fw-bold">
                                        {role}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 mx-auto p-3 shadow-lg">
                                    <form method="post" action="./user/setpassword">
                                        <div className="form-group">
                                            <span ref={passwordResponseMessage} className="form-control mb-4 text-white" hidden></span>
                                            <span className="form-group-text">Altes Passwort</span>
                                            <input autoComplete="password" ref={oldPassword} type="password" className="form-control" name="oldpassword" required />
                                            <span className="form-group-text">Neues Passwort</span>
                                            <input autoComplete="new-password" ref={password} type="password" className="form-control" name="password" required />
                                            <span className="form-group-text">Neues Passwort (Wiederholen)</span>
                                            <input autoComplete="new-password" ref={passwordRepeat} type="password" className="form-control" name="repeatPassword" required />
                                            <button type="button" onClick={changePassword} className="form-control btn btn-primary my-4">Passwort ändern</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-3 mx-auto p-3 shadow-lg">
                                    <div className="form-group">
                                        <span ref={emailResponseMessage} className="form-control mb-4 text-white" hidden></span>
                                        <span className="form-group-text">Momentanes Passwort</span>
                                        <input type="password" className="form-control" ref={currentPassword} name="currentpassword" required />
                                        <span className="form-group-text">Neue E-Mail</span>
                                        <input ref={email} type="email" className="form-control" name="email" required />
                                        <span className="form-group-text">Neue E-Mail (Wiederholen)</span>
                                        <input ref={emailRepeat} type="email" className="form-control" name="repeatEmail" required />
                                        <button type="button" onClick={changeEmail} className="form-control btn btn-primary my-4">E-Mail ändern</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-9 text-center p-3 mx-auto shadow-lg">
                                    <a href="./worlds?page=1" className="pbtn text-primary m-1">
                                        <i className="fas fa-folder fa-xl"></i>
                                    </a>
                                    {role === 'Administrator' && (
                                        <a href="./users-management?page=1" className="pbtn text-primary m-1">
                                            <i className="fa-solid fa-people-group fa-xl"></i>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer username={loginUsername} />
            </div>
        );
}
export const getServerSideProps = async (context) => {
    const loginUsername = context?.query?.username || null;

    return {
        props: {
            loginUsername: loginUsername,
            username: context?.query?.data?.username || null,
            uuid: context?.query?.data?.uuid || null,
            role: context?.query?.data?.role || null,
        }
    }
}

export default ProfilePage;
