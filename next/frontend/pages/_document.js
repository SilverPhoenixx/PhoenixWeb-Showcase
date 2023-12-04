import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
                          rel="stylesheet"
                          integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
                          crossOrigin="anonymous"
                    />

                    <link rel="stylesheet" href="/css/styles.css" />

                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
                            integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
                            crossOrigin="anonymous"></script>

                    <script src="https://kit.fontawesome.com/52cd1b0e87.js"></script>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
