import React, {useState} from 'react';
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";

const WorldsPage = ({username, worlds, page}) => {
    const siteHeader = {
        backgroundImage: "url('/assets/b7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "250px"
    };

    const importNameObj = React.createRef();
    const progress = React.createRef();
    const fileChooser = React.createRef();

    const [uploadProgress, setUploadProgress] = useState(0);
    const [importName, setImportName] = useState("");
    const getState = (state) => {
        switch (state) {
            case 0:
                return "Private";
            case 1:
                return "Nicht angefangen";
            case 2:
                return "In Arbeit";
            case 3:
                return "Fast fertig";
            case 4:
                return "In Begutachtung";
            case 5:
                return "Abgeschlossen";
            default:
                return "?";
        }
    }

    const downloadWorld = (server, world) => {
        try {
            window.open(`./world/download?server=${server}&world=${world}`, '_blank');
        } catch (err) {
            console.log(err);
        }
    }

    const onUpload = () => {
        const fileField = document.getElementById('uploadWorld');

        try {
            if (fileField.value === "") return;
            if (fileField.files[0] == null) return;

            setImportName('');
            setUploadProgress(0);

            const formData = new FormData();
            formData.append('world', fileField.files[0]);

            let client = new XMLHttpRequest();
            client.onload = (e) => {
                setUploadProgress(100)
            };

            client.upload.onprogress = (e) => {
                let p = Math.round((100 / e.total) * e.loaded);
                setUploadProgress(p)
            };

            client.onreadystatechange = () => {
                if (client.readyState === XMLHttpRequest.DONE) {
                    let result = JSON.parse(client.responseText);
                    if (result["State"] === "200") {
                        setImportName(result["Message"])
                        fileField.value = "";
                    }
                }
            }

            client.onerror = (e) => {
                console.log(e);
            }

            client.open("POST", "./world/upload");
            client.send(formData);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navigator username={username}/>
            <div className="container-fluid min-vh-100 p-0">
                <div style={siteHeader}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <h1 className="display-4 text-center" style={{
                            fontWeight: "bold",
                            color: "#fff",
                            textShadow: "12px 24px 18px rgb(0 0 0 / 90%)",
                            letterSpacing: "1px"
                        }}>
                            Die Welten
                            <br/>
                            <span style={{
                                display: "inline-block",
                                transform: "skew(-30deg)",
                                fontWeight: "bold",
                                backgroundColor: "#fff"
                            }}>
                  <p className="display-4 p-2"
                     style={{fontWeight: "bold", transform: "skew(30deg)", color: "#000", textShadow: "none"}}>
                    Liste
                  </p>
                </span>
                        </h1>
                    </div>
                    <div className="p-4 bg-dark"></div>
                </div>
                <div className="container-fluid h-25 py-8">
                    <div className="row">
                        <div className="col-9 mx-auto">
                            <div className="table-responsive shadow-lg">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">Server</th>
                                        <th scope="col">Welt</th>
                                        <th scope="col">Typ</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Rechte</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {worlds.map(world => (
                                        <tr key={world.Server + "-" + world.World}
                                            className="col-9 bg-light mx-auto shadow-lg">
                                            <th>{world.Server}</th>
                                            <td>{world.World}</td>
                                            <td>{world.Type}</td>
                                            <td>{getState(world.State)}</td>
                                            <td>{world.Permission}</td>
                                            <td><a
                                                href={`./world-settings?server=${world.Server}&world=${world.World}`}><i
                                                className="fa-solid fa-gear text-black pbtn"></i></a></td>
                                            <td><i onClick={() => downloadWorld(world.Server, world.World)}
                                                   className="fa-solid fa-download pbtn"></i></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                    <tfoot>
                                    <tr className="justify-content-end">
                                        <td colSpan="7">
                                            <div className="input-group">
                                                <input type="file" className="form-control" id="uploadWorld"
                                                       name="world" ref={fileChooser} aria-label="Upload"
                                                       accept=".zip,.rar,.7zip"/>
                                                <button className="btn btn-outline-primary" type="button"
                                                        onClick={onUpload}>Hochladen
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><label className="form-label">Importierende Welt: </label></td>
                                        <td colSpan="5"><label className="form-label" ref={importNameObj}
                                                               id="text">{importName}</label></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="7">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar"
                                                     aria-label="Example with label" ref={progress}
                                                     style={{width: `${uploadProgress}%`}}
                                                     aria-valuemin="0">{uploadProgress}%
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                                <a className="btn btn-primary mb-2 mx-3"
                                   href={`./worlds?page=${(page - 1) === 0 ? 1 : page - 1}`}>Vorherige Seite</a>
                                <a className="btn btn-primary  mb-2 mx-3 float-end" href={`./worlds?page=${page + 1}`}>Nächste
                                    Seite</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer username={username}/>
        </div>
    );
}


export const getServerSideProps = async (context) => {
    return {
        props: {
            username: context?.query?.username || null,
            worlds: context?.query?.data,
            page: context?.query?.page,
        }
    }
}

export default WorldsPage;
