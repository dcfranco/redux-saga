import {
    SUCCESS_ADD_CONTACT,
    SUCCESS_REMOVE_CONTACT,
    SUCCESS_EDIT_CONTACT,
    LOAD_SPINNER,
    UNLOAD_SPINNER,
    SUCCESS_LOAD_CONTACTS
} from '../actions/actions';

const initialState = {
    contacts: [],
    spinner: false
}

export default function Contact(state = initialState, action){
    switch(action.type){
        case SUCCESS_ADD_CONTACT:
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    action.contact
                ]
            }
        case SUCCESS_REMOVE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.contact.id)
            }
        case SUCCESS_EDIT_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if(contact.id === action.contact.id) return action.contact;
                    return contact;
                })
            }
        case SUCCESS_LOAD_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            }
        case LOAD_SPINNER:
            return {
                ...state,
                spinner: true
            }
        case UNLOAD_SPINNER:
            return {
                ...state,
                spinner: false
            }
        default:
            return state;
    }
}