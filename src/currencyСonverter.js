import React, {useEffect, useState} from 'react'
import InputCurrency from './inputCurrency'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=9cdcbbcdb70e13d28be695bd0aa861dd&format=1'

function CurrencyConverter(){
    const [currencyOptions, setCurrencyOptions] = useState([])

    useEffect(() => {
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                setCurrencyOptions([data.base, ...Object.keys(data.rates)])
            })
    }, [])
    
    return (
        <div>
            <InputCurrency currencyOptions={currencyOptions} />            
            <InputCurrency currencyOptions={currencyOptions}/>
        </div>
    );
}

export default CurrencyConverter;
