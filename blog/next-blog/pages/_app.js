import { ThemeProvider } from '../context/ThemeContext'; // Add this
import '../styles/normalize.css';
import '../styles/style.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider> {/* Wrap with ThemeProvider */}
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ThemeProvider>
  );
}
export default MyApp;
