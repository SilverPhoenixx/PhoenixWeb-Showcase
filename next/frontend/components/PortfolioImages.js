import React from 'react';

const PortfolioImages = ({ images }) => {


    return (
        <div className="row align-items-center text-center gx-3 justify-content-center">
            <div className="row justify-content-center">
                {images.map((image, index) => (
                    <div key={index} className="col-lg-5 col-md-12 bg-gray shadow-lg pt-3 rounded-lg m-3 py-3">
                        <h5 className="fs-1 fw-semibold text-white">{image.Name}</h5>
                        <div id={image.Name} className="carousel py-3">
                            <div className="carousel-inner">
                                {image.collection.map((picture, picIndex) => (
                                    <div
                                        key={picIndex}
                                        className={`carousel-item ${picIndex === 0 ? 'active' : ''} w-100`}
                                    >
                                        <a
                                            href={`/assets/${image.Name}/${picture}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={`/assets/${image.Name}/${picture}`}
                                                alt={`Bild ${picture}`}
                                                className="d-block img-fluid"
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target={`#${image.Name}`}
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={`#${image.Name}`}
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <h5 className="fs-5 text-white">{image.Description}</h5>
                        <h5 className="fs-5 text-white">Built by {image.Builder}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioImages;
