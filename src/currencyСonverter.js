import React, {useEffect, useState} from 'react'
import InputCurrency from './inputCurrency'
import LoopIcon from '@material-ui/icons/Loop';
import Button from '@material-ui/core/Button';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=9cdcbbcdb70e13d28be695bd0aa861dd&format=1'

function CurrencyConverter(){
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [currencyRates, setCurrencyRates] = useState([])    
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [exchangeRate, setExchangeRate] = useState(1)
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    
    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount        
        toAmount = Math.floor((amount * exchangeRate) * 100) / 100
    } else {
        toAmount = amount
        fromAmount = Math.floor((amount / exchangeRate) * 100) / 100
    }    
    
    useEffect(() => {
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                const firstCurrency = Object.keys(data.rates)[122]                
                setCurrencyOptions([...Object.keys(data.rates)])
                setCurrencyRates([...Object.values(data.rates)])
                setFromCurrency(data.base)
                setToCurrency(firstCurrency)
                setExchangeRate(data.rates[firstCurrency])                
            })
    }, [])
    
    function handleFromAmountChange(e) {
        if (e.target.value >= 0) {
            setAmount(e.target.value)
            setAmountInFromCurrency(true)
        } 
    }

    function handleToAmountChange(e) {
        if (e.target.value >= 0) {
            setAmount(e.target.value)
            setAmountInFromCurrency(false)
        }
    }

    function replaceCurrency() {
        var tmp = fromCurrency;
        setFromCurrency(toCurrency)
        setToCurrency(tmp)
        setExchangeRate(1/exchangeRate)
    }

    function handleToCurrencyChange(e) {
        setToCurrency(e.target.value)
        setExchangeRate(currencyRates[currencyOptions.indexOf(e.target.value)]/currencyRates[currencyOptions.indexOf(fromCurrency)])        
    }

    function handleFromCurrencyChange(e) {
        setFromCurrency(e.target.value)
        setExchangeRate(currencyRates[currencyOptions.indexOf(toCurrency)]/currencyRates[currencyOptions.indexOf(e.target.value)])
    }
        
    return (
        <div className="converter-box">
            <InputCurrency 
                currencyOptions={currencyOptions}
                selectCurrency={fromCurrency}
                onChangeCurrency={handleFromCurrencyChange}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
            />

            <div className="replace-icon">                
                <Button variant="outlined" onClick={() => {replaceCurrency()}}>
                    <LoopIcon />
                </Button>
            </div>

            <InputCurrency 
                currencyOptions={currencyOptions}
                selectCurrency={toCurrency}
                onChangeCurrency={handleToCurrencyChange}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
            />
        </div>
    );
}

export default CurrencyConverter;
