import Payment from 'payment';
import _ from 'lodash';

import { 
    format,
    setHours,
    setMinutes,
    addDays,
    getDay
} from "date-fns";

const TODAY = new Date();

function clearNumber(value = '') {
    return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value) {
    if (!value) {
        return value;
    }
    
    const issuer = Payment.fns.cardType(value);
    const clearValue = clearNumber(value);
    let nextValue;
    
    switch (issuer) {
        case 'amex':
        nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice( 4, 10, )} ${clearValue.slice(10, 15)}`;
        break;
        case 'dinersclub':
        nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice( 4, 10, )} ${clearValue.slice(10, 14)}`;
        break;
        default:
        nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice( 4, 8, )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
        break;
    }
    
    return nextValue.trim();
}

export function formatCVC(value, prevValue, allValues = {}) {
    const clearValue = clearNumber(value);
    let maxLength = 4;
    
    if (allValues.number) {
        const issuer = Payment.fns.cardType(allValues.number);
        maxLength = issuer === 'amex' ? 4 : 3;
    }
    
    return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
    const clearValue = clearNumber(value);
    
    if (clearValue.length >= 3) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }
    
    return clearValue;
}

export function formatFormData(data) {
    return Object.keys(data).map(d => `${d}: ${data[d]}`);
}

/**
* Helper function for query strings
* @param  {obj} object 
* @return {string}        
*/
export function getQueryString( object ) {
    return Object.keys( object ).map( key => key + '=' + object[ key ] ).join('&');
}

/**
* Helper function for search recursion in array
* @param1 [workdtofinds] finds
* @param2 [itemslist] list
* @param2 {string} identif
* return {countsItem} object
*/


export function findsRecurssionInArray(finds, lists, indx) {
    
    var result = _.map(finds, function(find){ 
        var length = _.reject(lists, function(el){
            return (el[indx].indexOf(find) < 0); 
        }).length; 
        return {id: find, count: length};
    });
    return result;
}

/**
 * return [] aray
 */

export function getExcludeTimes() {
    return [ 
        setHours(setMinutes(TODAY, 0), 0),
        setHours(setMinutes(TODAY, 30), 0),
        setHours(setMinutes(TODAY, 0), 1),
        setHours(setMinutes(TODAY, 30), 1),
        setHours(setMinutes(TODAY, 0), 2),
        setHours(setMinutes(TODAY, 30), 2),
        setHours(setMinutes(TODAY, 0), 3),
        setHours(setMinutes(TODAY, 30), 3),
        setHours(setMinutes(TODAY, 0), 4),
        setHours(setMinutes(TODAY, 30), 4),
        setHours(setMinutes(TODAY, 0), 5),
        setHours(setMinutes(TODAY, 30), 5),
        setHours(setMinutes(TODAY, 0), 6),
        setHours(setMinutes(TODAY, 30), 6),
        setHours(setMinutes(TODAY, 0), 7),
        setHours(setMinutes(TODAY, 30), 7),
        setHours(setMinutes(TODAY, 0), 8),
        setHours(setMinutes(TODAY, 30), 8),
        setHours(setMinutes(TODAY, 30), 9),
        setHours(setMinutes(TODAY, 0), 10),
        setHours(setMinutes(TODAY, 30), 10),
        setHours(setMinutes(TODAY, 30), 11),
        setHours(setMinutes(TODAY, 0), 12),
        setHours(setMinutes(TODAY, 30), 12),
        setHours(setMinutes(TODAY, 30), 13),
        setHours(setMinutes(TODAY, 0), 14),
        setHours(setMinutes(TODAY, 30), 14),
        setHours(setMinutes(TODAY, 30), 15),
        setHours(setMinutes(TODAY, 0), 16),
        setHours(setMinutes(TODAY, 30), 16),
        setHours(setMinutes(TODAY, 30), 17),
        setHours(setMinutes(TODAY, 0), 18),
        setHours(setMinutes(TODAY, 30), 18),
        setHours(setMinutes(TODAY, 0), 19),
        setHours(setMinutes(TODAY, 30), 19),
        setHours(setMinutes(TODAY, 0), 20),
        setHours(setMinutes(TODAY, 30), 20),
        setHours(setMinutes(TODAY, 0), 21),
        setHours(setMinutes(TODAY, 30), 21),
        setHours(setMinutes(TODAY, 0), 22),
        setHours(setMinutes(TODAY, 30), 22),
        setHours(setMinutes(TODAY, 0), 23),
        setHours(setMinutes(TODAY, 30), 23),
    ]
}