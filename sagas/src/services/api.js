import axios from 'axios';

const apiAxios = axios.create({
    baseURL: 'http://localhost:5000',
});

export function fetchContact(id) {
    return apiAxios.get('/contact/' + id);
};

export function fetchContacts() {
    return apiAxios.get('/contacts');
};

export function postContact(contact) {
    console.log(contact);
    return apiAxios.post('/contact', contact);
};

export function putContact(contact) {
    return apiAxios.put('/contact', contact);
};

export function deleteContact(contact) {
    return apiAxios.delete('/contact/' + contact._id);
};