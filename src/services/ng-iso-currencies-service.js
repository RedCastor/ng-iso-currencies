(function (angular) {
    'use strict';

    //Load module
    var module = angular.module('isoCurrencies', []);


    /**
     * Config Provider
     */
    module.provider('isoCurrencies', ['iso4217Currencies', function isoCurrencyProvider( iso4217Currencies ) {

        this.code = 'USD';
        this.text = 'US Dollar';
        this.fraction = 2;
        this.symbol = '$';
        this.position = 'left';
        this.decimalSep = '.';
        this.thousandSep = ',';

        this.setCurrencyIso4217 = function(code) {
            if (code) {
                this.code = code.toUpperCase();
            }

            var iso_currency = iso4217Currencies[this.code];

            this.text = iso_currency.text;
            this.fraction = iso_currency.fraction;
            this.symbol = iso_currency.symbol;
        };

        this.setCurrencyIso4217();

        this.$get = [ function() {

            var currency = {
                code:         this.code,
                text:         this.text,
                fraction:     this.fraction,
                symbol:       this.symbol,
                position:     this.position,
                decimalSep:   this.decimalSep,
                thousandSep:  this.thousandSep
            };

            return {
                getCurrency: function () {
                    return currency;
                },
                getCode: function() {
                    return currency.code;
                },
                getText: function() {
                    return currency.text;
                },
                getFraction: function() {
                    return currency.fraction;
                },
                getSymbol: function() {
                    return currency.symbol;
                },
                getPosition: function() {
                    return currency.position;
                },
                getDecimalSep: function() {
                    return currency.decimalSep;
                },
                getThousandSep: function() {
                    return currency.thousandSep;
                }
            };
        }];


        this.setByCode = function(code) {
            this.setCurrencyIso4217(code);
        };

        this.setCode = function(code) {
            this.code = code.toUpperCase() || this.code;
        };

        this.setText = function(text) {
            if (angular.isDefined(text) && angular.isString(text)) {
                this.text = text;
            }
        };

        this.setFraction = function(fraction) {
            if (angular.isDefined(fraction) && angular.isNumber(fraction)) {
                this.fraction = fraction;
            }
        };

        this.setSymbol = function(symbol) {
            if (angular.isDefined(symbol)) {
                this.symbol = symbol;
            }
        };

        this.setPosition = function(position) {
            if (angular.isDefined(position) && angular.isString(position)) {
                this.position = position;
            }
        };

        this.setDecimalSep = function(decimalSep) {
            if (angular.isDefined(decimalSep) && angular.isString(decimalSep)) {
                this.decimalSep = decimalSep;
            }
        };

        this.setThousandSep = function(thousandSep) {
            if (angular.isDefined(thousandSep) && angular.isString(thousandSep)) {
                this.thousandSep = thousandSep;
            }
        };


    }]);


    /**
     * iso4217 currency by code country
     */
    module.factory('isoCurrencyService', [ 'isoCurrencies', 'iso4217Currencies', function( isoCurrencies, iso4217Currencies ){

        var currency = isoCurrencies.getCurrency();

        function _set_currency_iso4217(code) {
            if (code) {
                currency.code = code.toUpperCase();
            }

            var iso_currency = iso4217Currencies[currency.code];

            currency.text = iso_currency.text;
            currency.fraction = iso_currency.fraction;
            currency.symbol = iso_currency.symbol;

            return currency;
        }

        return {

            /**
             * retrieves the object holding currency.
             *
             * @param string code
             * @return object
             */
            getCurrencyByCode: function(code) {

                if (code) {
                    _set_currency_iso4217(code);
                }

                return currency;
            }
        };
    }]);


}(angular));
