import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    root: {      
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        maxWidth: '250px',   
        width: '90vw',             
      },
    },
    inputBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
  }));

function InputCurrency(props){
    const classes = useStyles();
    
    const {
        currencyOptions
    } = props
    
    return (
        <div className={classes.inputBox}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                id="standard-helperText"
                label="Значение"
                />

                <TextField
                    id="standard-select-currency"
                    select
                    label="Валюта"
                    value={currencyOptions[0]}
                                        
                    >
                    {currencyOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>        
            </form>
        </div>
    )
}

export default InputCurrency;
