import {action, computed, makeObservable, observable} from 'mobx'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=9cdcbbcdb70e13d28be695bd0aa861dd&format=1'

function Store(){
    return makeObservable({
        currencyOptions: [""],
        currencyRates: [0],
        fromCurrency: "",
        toCurrency: "",
        exchangeRate: 1,        
        fromAmount: 1,
        toAmount: 1,        
        amountInFromCurrency: true,
             
        get amount(){
            var tmp
            if (this.amountInFromCurrency){
                tmp = Math.floor((this.fromAmount * this.exchangeRate) * 100) / 100 
            } else {
                tmp = Math.floor((this.toAmount / this.exchangeRate) * 100) / 100
            }
            return tmp
        },

        initStore(){
            fetch(BASE_URL)
                .then(res => res.json())
                .then(data => {
                    var firstCurrency = Object.keys(data.rates)[122]                
                    this.currencyOptions = [...Object.keys(data.rates)]
                    this.currencyRates = [...Object.values(data.rates)]
                    this.fromCurrency = data.base
                    this.toCurrency = firstCurrency
                    this.exchangeRate = data.rates[firstCurrency]
                    this.toAmount = this.amount
            })           
        },

        replaceCurrency() {
            var tmp = this.fromCurrency;
            this.fromCurrency = this.toCurrency
            this.toCurrency = tmp
            this.exchangeRate = 1 / this.exchangeRate
            this.toAmount = this.amount
        },

        fromCurrencyChange(e) {
            this.fromCurrency = e.target.value
            this.exchangeRate = this.currencyRates[this.currencyOptions.indexOf(this.toCurrency)]/this.currencyRates[this.currencyOptions.indexOf(e.target.value)]
            this.toAmount = this.amount 
        },

        toCurrencyChange(e) {
            this.toCurrency = e.target.value
            this.exchangeRate = this.currencyRates[this.currencyOptions.indexOf(e.target.value)]/this.currencyRates[this.currencyOptions.indexOf(this.fromCurrency)]
            this.toAmount = this.amount         
        },        

        fromAmountChange(e){
            if (e.target.value >= 0) {
                this.fromAmount = e.target.value
                this.amountInFromCurrency = true
                this.toAmount = this.amount                
            }            
        },

        toAmountChange(e){
            if (e.target.value >= 0) {
                this.toAmount = e.target.value
                this.amountInFromCurrency = false
                this.fromAmount = this.amount                
            } 
        },

    }, {
        fromCurrency: observable,
        toCurrency: observable,
        toAmount: observable, 
        fromAmount: observable,
        amount: computed,
        replaceCurrency: action.bound,
        toCurrencyChange: action.bound,
        fromCurrencyChange: action.bound,
        fromAmountChange: action.bound,
        toAmountChange: action.bound,
        initStore: action.bound,
    })
}

export default Store;
