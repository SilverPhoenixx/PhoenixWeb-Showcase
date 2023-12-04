import React from 'react';
import Navigator from "../../components/Navigator";
import WikiCard from '../../components/WikiCard';
import Footer from "../../components/Footer";


const WikiIndex = ({ username, articles, page, editPermission, searchText  }) => {

    searchText = !searchText ? "" : searchText;

    const siteHeader = {
        backgroundImage: "url('/assets/SkyWhale.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "250px"
    };
    const search = () => {
        const searchValue = document.getElementById("search").value;
        if (searchValue === "") {
            window.location = "./1";
        } else {
            window.location = `./1?search=${!searchValue ? "" : searchValue}`;
        }
    };

        return (
            <div>
                <Navigator username={username} />
                <div style={siteHeader}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div>
                            <h1 className="display-4"
                                style={{ fontWeight: "bold", color: "#fff", textShadow: "12px 24px 18px rgb(0 0 0 / 90%)", letterSpacing: "1px" }}>
                                <br />
                                <span style={{ display: "inline-block", transform: "skew(-30deg)", fontWeight: "bold", backgroundColor: "#fff" }}>
                  <p className="display-4 p-2"
                     style={{ fontWeight: "bold", transform: "skew(30deg)", color: "#000", textShadow: "none" }}>
                    PhoenixWiki
                  </p>
                </span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container-fluid min-vh-100 bg-dark">
                    <div className="row justify-content-center">
                        <div className="col-9">
                            <div className="row pt-5">
                                <div className="col-12">
                                    <label htmlFor="search" className="form-label text-light fs-3">Wiki durchsuchen:</label>
                                </div>
                                <div className="col-12 col-sm-8 py-1">
                                    <input type="text" id="search" className="form-control" aria-labelledby="searchWiki"
                                           defaultValue={searchText} />
                                </div>
                                {editPermission ?
                                    <React.Fragment>
                                        <div className="col-12 col-sm-2 py-1">
                                            <button type="submit" className="btn btn-primary w-100" onClick={search}>Suchen</button>
                                        </div>
                                        <div className="col-12 col-sm-2 py-1">
                                            <a href="./wiki/add" className="btn btn-success w-100">Hinzufügen</a>
                                        </div>
                                    </React.Fragment> :
                                    <div className="col-12 col-sm-4 py-1">
                                        <button type="submit" className="btn btn-primary w-100" onClick={search}>Suchen</button>
                                    </div>
                                }


                                {articles.map(article => (
                                    <div key={article.Title} className="col py-3">
                                        <WikiCard author={article.Username} wikiDate={article.Date} editPermission={editPermission} title={article.Title} />
                                    </div>
                                ))}

                                <div className="col-12">
                                    <nav aria-label="WikiPage Pagination">
                                        <ul className="pagination justify-content-center">
                                            {page > 1 &&
                                                <li className="page-item">
                                                    <a className="page-link"
                                                       href={`./${parseInt(page) - 1}?search=${searchText}`}>
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </a>
                                                </li>
                                            }
                                            <li className="page-item active">
                                                <a className="page-link" href={`./${page}?search=${searchText}`}>
                                                    {page}
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link"
                                                   href={`./${parseInt(page) + 1}?search=${searchText}`}>
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer username={username} />
            </div>
        );
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            username: context?.query?.username || null,
            articles: context?.query?.data?.articles || null,
            page: context?.query?.data?.page || null,
            editPermission: context?.query?.data?.editPermission || null,
            searchText: context?.query?.data?.searchText || null,
        }
    }
}


export default WikiIndex;
