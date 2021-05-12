import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

function InputCurrency(props){    
    const {
        currencyOptions,
        selectCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    
    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField                
                label="Значение"
                value={amount}
                onChange={onChangeAmount}
                />

                <div>               
                    <InputLabel shrink htmlFor="age-native-label-placeholder">Валюта</InputLabel>
                    <Select
                        native
                        value={selectCurrency}
                        onChange={onChangeCurrency}
                        >                  

                        {currencyOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select>   
                </div>             
            </form>
        </div>
    )
}

export default InputCurrency;
