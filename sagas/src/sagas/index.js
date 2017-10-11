import { put, call, take, takeLatest, takeEvery } from 'redux-saga/effects'
import * as api from '../services/api'

import {
    REQUEST_ADD_CONTACT,
    REQUEST_REMOVE_CONTACT,
    REQUEST_EDIT_CONTACT,
    SUCCESS_LOAD_CONTACTS,
    SUCCESS_ADD_CONTACT,
    SUCCESS_REMOVE_CONTACT,
    SUCCESS_EDIT_CONTACT,
    FAILED_LOAD_CONTACTS,
    FAILED_ADD_CONTACT,
    FAILED_REMOVE_CONTACT,
    FAILED_EDIT_CONTACT,
    LOAD_SPINNER, 
    UNLOAD_SPINNER,
    REQUEST_LOAD_SYSTEM
} from '../actions/actions'

function *sleep(time) {
    yield new Promise(resolve => setTimeout(resolve, time));
}

export function* loadContacts() {
    try{
        yield put({ type: LOAD_SPINNER });
        let {data} = yield call(api.fetchContacts);
        yield put({ type: SUCCESS_LOAD_CONTACTS, contacts: data.contacts });
    } catch(e) {
        yield put({ type: FAILED_LOAD_CONTACTS });
    } finally {
        yield put({ type: UNLOAD_SPINNER });
    }
}

export function* addContact(action) {
    try{
        yield put({ type: LOAD_SPINNER });
        let {data} = yield call(api.postContact, action.contact);
        yield put({ type: SUCCESS_ADD_CONTACT, contact: data.contact });        
    } catch(e) {
        yield put({ type: FAILED_ADD_CONTACT });
    } finally {
        yield put({ type: UNLOAD_SPINNER });
    }
}

export function* removeContact(action) {
    try{
        yield put({ type: LOAD_SPINNER });
        yield call(api.deleteContact, action.contact);
        yield put({ type: SUCCESS_REMOVE_CONTACT, contact: action.contact });
    } catch(e) {
        yield put({ type: FAILED_REMOVE_CONTACT });
    } finally {
        yield put({ type: UNLOAD_SPINNER });
    }
}

export function* editContact(action) {
    try{
        yield put({ type: LOAD_SPINNER });
        let {data} = yield call(api.putContact, action.contact);
        yield put({ type: SUCCESS_EDIT_CONTACT, contact: data.contact });
    } catch(e) {
        yield put({ type: FAILED_EDIT_CONTACT });
    } finally {
        yield put({ type: UNLOAD_SPINNER });
    }
}

export default function* rootSaga() {
    yield takeEvery(REQUEST_LOAD_SYSTEM, loadContacts);
    yield takeLatest(REQUEST_ADD_CONTACT, addContact);
    yield takeLatest(REQUEST_REMOVE_CONTACT, removeContact);
    yield takeLatest(REQUEST_EDIT_CONTACT, editContact);
}