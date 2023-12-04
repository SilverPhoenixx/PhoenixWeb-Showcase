import React, { useState } from 'react';
import Navigator from '../../components/Navigator';
import Footer from '../../components/Footer';
import TipTapEditor from '../../components/TipTapEditor';

const WikiAddPage = (username) => {
    const title = React.createRef();
    const headerURL = React.createRef();

    const errorMessage = React.createRef();
    const errorMessageHolder = React.createRef();
    const addWiki = async () => {
        if (document.getElementById("tiptapContent").value === '' || title.current.value === '' || headerURL.current.value === '') {
            showError('Der Artikel ist nicht vollständig', 'fail');
            return;
        }

        try {
            const res = await fetch('./add', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    Title: title,
                    HeaderURL: headerURL,
                    Content: document.getElementById("tiptapContent").value,
                }),
            });

            const data = await res.json();
            showError(data.Message, data.State);

            if (data.State === 'success') {
                headerURL.current.value = "";
                title.current.value = "";
                document.getElementById("tiptapContent").value = "";

                const proseMirrorElements = document.getElementsByClassName('ProseMirror');
                for (let element of proseMirrorElements) {
                    element.innerHTML = '';
                }
            }
        } catch (error) {
            console.error('Error adding wiki:', error);
        }
    };

    const showError = (message, type) => {
        errorMessage.current.innerHTML = message;
        errorMessageHolder.current.hidden = false;
        switch (type) {
            case "success": {
                errorMessageHolder.current.className = "form-control mb-4 text-white bg-success";
            }
            case "fail": {
                errorMessageHolder.current.className = "form-control mb-4 text-white bg-danger";
            }
        }
    };

    return (
        <div>
            <Navigator username={username} />
            <div className="container-fluid min-vh-100 p-0">
                <div className="siteHeader">
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-11 p-3 mt-5 shadow-lg">
                            <div
                                ref={errorMessageHolder}
                                id="errorMessageHolder"
                                hidden
                            >
                                <span ref={errorMessage} id="errorMessage"></span>
                            </div>
                            <b className="fs-5">Artikel hinzufügen</b>
                            <div className="input-group input-group-sm mb-1">
                                <span className="input-group-text">Titel*</span>
                                <input
                                    ref={title}
                                    type="text"
                                    className="form-control"
                                    name="Titel"
                                    id="title"
                                    required
                                />
                            </div>
                            <div className="input-group input-group-sm mb-1">
                                <span className="input-group-text">Header URL*</span>
                                <input
                                    ref={headerURL}
                                    type="text"
                                    className="form-control"
                                    name="HeaderURL"
                                    id="HeaderURL"
                                    placeholder="https://img.com/abc"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <span className="input-group-text my-2">Wiki Inhalt</span>
                                <TipTapEditor
                                    content={""}
                                    className="mb-2"
                                />
                            </div>
                            <div className="input-group input-group-sm text-center d-inline-block">
                                <button
                                    type="submit"
                                    className="btn btn-primary px-5 p-3"
                                    onClick={addWiki}
                                >
                                    <b>Hinzufügen</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer username={username} />
        </div>
    );
};

export default WikiAddPage;
