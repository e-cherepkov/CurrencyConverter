import React from 'react'
import Container from '@material-ui/core/Container';
import CurrencyConverter from './currencyСonverter'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({  
  MuiContainerfixed: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

function App() {
  const classes = useStyles();

  return (
    <Container fixed className={classes.MuiContainerfixed}>
      <CurrencyConverter />
    </Container>
  );
}

export default App;
