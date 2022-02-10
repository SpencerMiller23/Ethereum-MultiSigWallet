import { Provider } from 'react-redux'
import store from '../store'

import '../styles/globals.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Layout } from '../components/Layout'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#e3f2fd',
    },
    light: {
      main: '#fff',
    }
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
