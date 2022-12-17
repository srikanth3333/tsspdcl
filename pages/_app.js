import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'antd/dist/antd.css'
import Wrapper from "../components/Wrapper";
import store from '../redux/store';
import {Provider} from 'react-redux';
import 'devextreme/dist/css/dx.light.css';


function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  )
}

export default MyApp
