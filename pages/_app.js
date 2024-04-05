import {Fragment} from "react";
import '@fontsource/quicksand'
import '../styles/app.scss'
import MainLoader from "../components/common/loader";
import Head from "next/head";
import ThemeProvider from "../contexts/theme";
import I18nProvider from "../contexts/i18n";

const App = ({Component, pageProps}) => {
    let Layout = Component.layout || Fragment

    return (
        <>
            <Head>
                <title>Vunca</title>
            </Head>
            <I18nProvider>
                <ThemeProvider>
                    <MainLoader/>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </I18nProvider>
        </>
    )
}


export default App