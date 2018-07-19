import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';


function validateDate(date: FormControl) {
    let regexp = /^\d{4}-\d{2}-\d{2}$/;
    if(date.value != undefined) {
        var arr = date.value.split('-');
    }
    if(!regexp.test(date.value)) {
        return {
            validateDate: {
                valid: false
            }
        }
    }
    else {
        if(Number(arr[0])>2025 || Number(arr[0])<2018) {
            return {
                validateDate: {
                    valid: false
                }
            }
        }
        else {
            if(arr[1] === '01' || arr[1] === '03' || arr[1] === '05' || arr[1] === '07' ||
                arr[1] === '08' || arr[1] === '10' || arr[1] === '12') {
                if(Number(arr[2])>31 || Number(arr[2])<1) {
                    return {
                        validateDate: {
                            valid: false
                        }
                    }
                }
                else {
                    return null;
                }

            }
            else if(arr[1] === '04' || arr[1] === '06' || arr[1] === '09' || arr[1] === '11') {
                if(Number(arr[2])>30 || Number(arr[2])<1) {
                    return {
                        validateDate: {
                            valid: false
                        }
                    }
                }
                else {
                    return null;
                }
            }
            else if(arr[1] === '02') {
                if(Number(arr[2])>28 || Number(arr[2])<1) {
                    return {
                        validateDate: {
                            valid: false
                        }
                    }
                }
                else {
                    return null;
                }
            }
        }
    }
}

@Directive({
    selector: '[validateDate]',
    providers: [
        { provide: NG_VALIDATORS, useValue: validateDate, multi: true }
    ]
})

export class ValidateDate { }