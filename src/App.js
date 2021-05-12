import React from 'react'
import Container from '@material-ui/core/Container';
import CurrencyConverter from './currencyСonverter'
import { makeStyles } from '@material-ui/core/styles';

function App() {
  return (
    <Container fixed>
      <CurrencyConverter />
    </Container>
  );
}

export default App;
