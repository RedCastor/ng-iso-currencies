
(function (angular) {
    'use strict';

    //Load module
    var module = angular.module('isoCurrencies', []);


    /**
     * Filter
     */
    module.filter('isoCurrency', ['$filter', 'isoCurrencyService', function($filter, isoCurrencyService) {



        Number.prototype.numberFormat = function(decimals, dec_sep, thousand_sep) {
            dec_sep = typeof dec_sep !== 'undefined' ? dec_sep : '.';
            thousand_sep = typeof thousand_sep !== 'undefined' ? thousand_sep : ',';

            var parts = parseFloat( this.toFixed(decimals) ).toString().split('.');

            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousand_sep);

            return  parts.join(dec_sep);
        };


        /**
         * transforms an amount into the right format and currency according to a passed currency code (3 chars).
         *
         * @param float amount
         * @param string currencyCode e.g. EUR, USD
         * @param number fraction User specified fraction size that overwrites default value
         * @return string
         */
        return function(amount, currencyCode, fraction, dec_sep, thousand_sep, position) {

            var currency = isoCurrencyService.getCurrencyByCode(currencyCode);

            //Get the size fraction
            if (angular.isDefined(fraction)) {
                currency.fraction = fraction;
            }

            //Get the decimal separator
            if (angular.isDefined(dec_sep)) {
                currency.decimalSep = dec_sep;
            }

            //Get the thousand separator
            if (angular.isDefined(thousand_sep)) {
                currency.thousandSep = thousand_sep;
            }

            //Get the thousand separator
            if (angular.isDefined(position)) {
                currency.position = position;
            }


            //format number fraction size, decimal separator and thousand separator
            var amount_fraction = parseFloat(amount).numberFormat(currency.fraction, currency.decimalSep, currency.thousandSep);

            var result = '';

            switch (currency.position) {
                case 'left' :
                    result = currency.symbol + amount_fraction;
                    break;
                case 'right' :
                    result = amount_fraction + currency.symbol;
                    break;
                case 'left_space' :
                    result = currency.symbol + '\u00A0' + amount_fraction;
                    break;
                case 'right_space' :
                    result = amount_fraction + '\u00A0' + currency.symbol;
                    break;
            }

            return result;
        };

    }]);


}(angular));
