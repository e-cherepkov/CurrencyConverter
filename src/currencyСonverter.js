import React from 'react'
import InputCurrency from './inputCurrency'
import LoopIcon from '@material-ui/icons/Loop'
import Button from '@material-ui/core/Button'
import Store from './Store'
import {observer} from 'mobx-react'
import {runInAction} from 'mobx'

const store = Store()
store.initStore()

const CurrencyConverter = observer(() => {   

    return (
        <div className="converter-box">
            <InputCurrency 
                currencyOptions={store.currencyOptions}
                selectCurrency={store.fromCurrency}
                onChangeCurrency={store.fromCurrencyChange}
                onChangeAmount={store.fromAmountChange}
                amount={store.fromAmount}
            />

            <div className="replace-icon">                
                <Button variant="outlined" onClick={() => {store.replaceCurrency()}}>
                    <LoopIcon />
                </Button>
            </div>

            <InputCurrency 
                currencyOptions={store.currencyOptions}
                selectCurrency={store.toCurrency}
                onChangeCurrency={store.toCurrencyChange}
                onChangeAmount={store.toAmountChange}
                amount={store.toAmount}
            />
        </div>
    );
})

export default CurrencyConverter;
