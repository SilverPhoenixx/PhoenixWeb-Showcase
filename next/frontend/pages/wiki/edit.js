import React from 'react';
import Navigator from '../../components/Navigator';
import Footer from '../../components/Footer';
import TipTapEditor from '../../components/TipTapEditor';

const WikiEditPage = ({username, title, headerUrl, content}) => {
    const headerURLRef = React.createRef();
    const titleRef = React.createRef();


    const errorMessage = React.createRef();
    const errorMessageHolder = React.createRef();

    const deleteWiki = async () => {
        try {
            await fetch('./delete', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    Title: titleRef.current.value,
                }),
            });
            window.location = './?page=1';
        } catch (error) {
            console.error('Error deleting wiki:', error);
        }
    };

    const addWiki = async () => {
        if (document.getElementById("tiptapContent").value === '' || titleRef.current.value === '' || headerURLRef.current.value === '') {
            showError('Der Artikel ist nicht vollständig', 'fail');
            return;
        }

        try {
            const res = await fetch('./edit', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    Title: title,
                    HeaderURL: headerURLRef.current.value,
                    Content: document.getElementById("tiptapContent").value,
                }),
            });

            const data = await res.json();
            showError(data.Message, data.State);
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
                    <div className="row p-3 mt-5 shadow-lg">
                        <div className="col-12 text-right">
                            <div className="input-group input-group-sm text-end d-inline-block">
                                <button
                                    type="submit"
                                    className="btn btn-danger px-5 p-3"
                                    onClick={deleteWiki}
                                >
                                    <b>Beitrag löschen</b>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-11">
                            <div
                                ref={errorMessageHolder}
                                id="errorMessageHolder"
                                hidden
                            >
                                <span ref={errorMessage} id="errorMessage"></span>
                            </div>
                            <b className="fs-5">Artikel bearbeiten</b>
                            <div className="input-group input-group-sm mb-1">
                                <span className="input-group-text">Titel*</span>
                                <input
                                    ref={titleRef}
                                    type="text"
                                    className="form-control"
                                    name="Titel"
                                    id="title"
                                    defaultValue={title}
                                />
                            </div>
                            <div className="input-group input-group-sm mb-1">
                                <span className="input-group-text">Header URL*</span>
                                <input
                                    ref={headerURLRef}
                                    type="text"
                                    className="form-control"
                                    name="HeaderURL"
                                    id="HeaderURL"
                                    placeholder="https://img.com/abc"
                                    required
                                    defaultValue={headerUrl}
                                />
                            </div>
                            <div className="mb-3">
                <span className="input-group-text my-2">
                  Wiki Inhalt
                </span>
                                <TipTapEditor
                                    content={content}
                                    className="mb-2"
                                />
                            </div>
                            <div className="input-group input-group-sm text-center d-inline-block">
                                <button
                                    type="submit"
                                    className="btn btn-primary px-5 p-3"
                                    onClick={addWiki}
                                >
                                    <b>Speichern</b>
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

export const getServerSideProps = async (context) => {
    return {
        props: {
            username: context?.query?.username  || null,
            title:  context?.query?.data.Title || null,
            headerUrl: context?.query?.data?.HeaderURL || null,
            content: context?.query?.data?.Content || null,
        }
    }
}


export default WikiEditPage;
