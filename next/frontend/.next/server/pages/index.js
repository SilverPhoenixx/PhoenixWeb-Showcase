"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 2155:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_private_next_pages_2F_document_js_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderpage_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_private_next_pages_2F_document_js_middlewareConfigBase64_e30_3D_getServerSideProps),
  getStaticPaths: () => (/* binding */ getStaticPaths),
  getStaticProps: () => (/* binding */ getStaticProps),
  reportWebVitals: () => (/* binding */ reportWebVitals),
  routeModule: () => (/* binding */ routeModule),
  unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
  unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
  unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
  unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
  unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
});

// NAMESPACE OBJECT: ./pages/index.js
var pages_namespaceObject = {};
__webpack_require__.r(pages_namespaceObject);
__webpack_require__.d(pages_namespaceObject, {
  "default": () => (pages),
  getServerSideProps: () => (getServerSideProps)
});

// EXTERNAL MODULE: ../node_modules/next/dist/server/future/route-modules/pages/module.js
var pages_module = __webpack_require__(6415);
var module_default = /*#__PURE__*/__webpack_require__.n(pages_module);
// EXTERNAL MODULE: ../node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(158);
// EXTERNAL MODULE: ./pages/_document.js
var _document = __webpack_require__(9123);
// EXTERNAL MODULE: ./pages/_app.js
var _app = __webpack_require__(5988);
// EXTERNAL MODULE: ../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4246);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/Navigator.js
var Navigator = __webpack_require__(3875);
// EXTERNAL MODULE: ./components/Footer.js
var Footer = __webpack_require__(7700);
;// CONCATENATED MODULE: ./pages/index.js




const IndexPage = ({ username })=>{
    const siteHeader = {
        backgroundImage: "url('/assets/TeamPose.png')",
        backgroundSize: "cover",
        backgroundPosition: "50% 20%",
        height: "250px"
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Navigator/* default */.Z, {
                username: username
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "container-fluid min-vh-100 p-0",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        style: siteHeader,
                        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "d-flex justify-content-center align-items-center h-100",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("h1", {
                                className: "display-4",
                                style: {
                                    fontWeight: "bold",
                                    color: "#fff",
                                    textShadow: "12px 24px 18px rgba(0, 0, 0, 0.9)",
                                    letterSpacing: "1px"
                                },
                                children: [
                                    "Willkommen auf",
                                    /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                        style: {
                                            display: "inline-block",
                                            transform: "skew(-30deg)",
                                            fontWeight: "bold",
                                            backgroundColor: "#fff"
                                        },
                                        children: /*#__PURE__*/ jsx_runtime.jsx("p", {
                                            className: "display-4 p-2",
                                            style: {
                                                fontWeight: "bold",
                                                transform: "skew(30deg)",
                                                color: "#000",
                                                textShadow: "none"
                                            },
                                            children: "PhoenixRPG"
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "p-4 mb-5 bg-dark"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "container-fluid",
                        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "container",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "row",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                                        className: "col-12 mt-5",
                                        children: /*#__PURE__*/ jsx_runtime.jsx("h1", {
                                            className: "display-4",
                                            style: {
                                                fontWeight: "bold"
                                            },
                                            children: "Informationen"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "col-12 mt-5 input-right shadow-lg",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                className: "service-icon px-3",
                                                children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                    "aria-hidden": true,
                                                    className: "fa-solid fa-people-group fa-3x"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "px-5 my-3 service-description",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                                        className: "display-6",
                                                        style: {
                                                            fontWeight: "bold"
                                                        },
                                                        children: "\xdcber das Team"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                                                        className: "fs-5",
                                                        children: "Das Projekt wurde umgestaltet zu einer kleinen Wissensdatenbank um den Umgang mittels NodeJS im Zusammenhang mit NextJS und ExpressJS zu lernen. Hierbei spielt ExpressJS eine signifikante Rolle im Backend zum Bereitstellen des Webservers, deren Routen und die REST API. Des Weiteren spielt NextJS (Server-side ReactJS) die Hauptrolle im Frontend."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "col-12 mt-5 input-right shadow-lg",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                className: "service-icon px-3",
                                                children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                    "aria-hidden": true,
                                                    className: "fas fa-server fa-3x"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "px-5 my-3 service-description",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                                        className: "display-6",
                                                        style: {
                                                            fontWeight: "bold"
                                                        },
                                                        children: "Aufstellung des Teams"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                                                        className: "fs-5",
                                                        children: "Unser Team besteht derzeit aus aktiv 2 Personen, einem Fachinformatiker f\xfcr Anwendungsentwicklung und einem Lehrer f\xfcr Kunst und Technik"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "col-12 mt-5 input-right shadow-lg",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                className: "service-icon px-3",
                                                children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                    "aria-hidden": true,
                                                    className: "fas fa-lightbulb fa-3x"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "px-5 my-3 service-description",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                                        className: "display-6",
                                                        style: {
                                                            fontWeight: "bold"
                                                        },
                                                        children: "Planung der Zukunft"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                                                        className: "fs-5",
                                                        children: "In Zukunft soll die Webseite mit einem besseren und gr\xf6\xdferen Wikipedia ausgestattet werden, so das Informationen von uns \xfcber eigene Themen, die uns interessieren, bereitgestellt werden k\xf6nnen."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "col-12 mt-5 input-right shadow-lg",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                className: "service-icon px-3",
                                                children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                    "aria-hidden": true,
                                                    className: "fas fa-exclamation-circle fa-3x"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "px-5 my-3 service-description",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                                        className: "display-6",
                                                        style: {
                                                            fontWeight: "bold"
                                                        },
                                                        children: "Kontakt"
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                                        className: "fs-5",
                                                        children: [
                                                            "Sollte man Interesse an Informationstechnologie, Anime, Serien und Spielen haben kann man sich gerne \xfcber ",
                                                            /*#__PURE__*/ jsx_runtime.jsx("a", {
                                                                href: "http://discord.seraphimbuildings.de",
                                                                children: "Discord"
                                                            }),
                                                            " bei uns melden!"
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "container-fluid pb-5"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Footer/* default */.Z, {
                username: username
            })
        ]
    });
};
const getServerSideProps = async (context)=>{
    const username = context?.query?.username || null;
    return {
        props: {
            username
        }
    };
};
/* harmony default export */ const pages = (IndexPage);

;// CONCATENATED MODULE: ../node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2F&preferredRegion=&absolutePagePath=private-next-pages%2Findex.js&absoluteAppPath=private-next-pages%2F_app.js&absoluteDocumentPath=private-next-pages%2F_document.js&middlewareConfigBase64=e30%3D!

        // Next.js Route Loader
        
        

        // Import the app and document modules.
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_private_next_pages_2F_document_js_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(pages_namespaceObject, "default"));

        // Re-export methods.
        const getStaticProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(pages_namespaceObject, "getStaticPaths")
        const next_route_loaderpage_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_private_next_pages_2F_document_js_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(pages_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(pages_namespaceObject, "reportWebVitals")
        

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/index","pathname":"/","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({
          ...options,
          components: {
            App: _app["default"],
            Document: _document["default"],
          },
          userland: pages_namespaceObject,
        })
        
        
    

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 4140:
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 9716:
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 6368:
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 6724:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [98,634,61], () => (__webpack_exec__(2155)));
module.exports = __webpack_exports__;

})();