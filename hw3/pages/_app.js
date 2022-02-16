import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { GlobalStyles } from "../components/helper/makeitdark";


function MyApp({ Component, pageProps }) {
  return (
    <>
        <GlobalStyles/>
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
