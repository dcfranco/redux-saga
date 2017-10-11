import {
    REQUEST_ADD_CONTACT,
    REQUEST_REMOVE_CONTACT,
    REQUEST_EDIT_CONTACT,
    REQUEST_LOAD_SYSTEM
} from './actions'

export function loadSystem(){
    return {
        type: REQUEST_LOAD_SYSTEM
    }
}

export function addContact(contact){
    return {
        type: REQUEST_ADD_CONTACT,
        contact
    }
}

export function removeContact({contact}){
    return {
        type: REQUEST_REMOVE_CONTACT,
        contact
    }
}

export function editContact({contact}){
    return {
        type: REQUEST_EDIT_CONTACT,
        contact
    }
}