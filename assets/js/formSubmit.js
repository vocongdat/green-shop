import Validator from './validator-short.js';
import { API } from './variables.js';

const form = new Validator('#form-1');

form.onSubmit = function (formData) {
    fetch(API + 'profile', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
};
