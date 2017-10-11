import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ContactActions from '../actions'

import logo from '../assets/imgs/redux-saga.png';
import spinner from '../assets/imgs/ajaxSpinner.gif'
import edit from '../assets/imgs/edit.png'
import remove from '../assets/imgs/remove.png'
import save from '../assets/imgs/save.png'

import '../assets/App.css';
import '../assets/index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

class ContactApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: "",
            contactInEdit: {}
        }
    }
    componentDidMount(){
        this.props.loadSystem();
    }
    onAddClick = () => {
        let maxId = this.props.contacts.length > 0 ? Math.max.apply(Math,this.props.contacts.map(contact => contact.id)) : 0;
        this.props.addContact({
            name: this.state.contact,
            update: new Date().toLocaleString()
        });
    }
    onEditClick = (contact) => {
        this.setState({ contactInEdit: contact });
    }
    onEditChange = (name) => {
        this.setState({
            contactInEdit: {
                ...this.state.contactInEdit,
                name,
                update: new Date().toLocaleString()
            }
        });
    }
    onSave = () => {
        this.props.editContact({
            contact: this.state.contactInEdit
        });
        this.setState({ contactInEdit: {} });
    }
    onRemoveClick = (contact) => {
        this.props.removeContact({ contact });
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div className="col-sm-12">
                    <div className="row" style={{ marginBottom: '40px', marginTop: '10px' }}>
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="row">
                                <div className="col-sm-6 col-sm-offset-3" style={{ paddingRight: '0px' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Descrição da tarefa"
                                        value={this.state.contact}
                                        onChange={(e) => this.setState({ contact: e.currentTarget.value })}
                                    />
                                </div>
                                <div className="col-sm-1" style={{ paddingLeft: '0px' }}>
                                    <button type="button" className="btn btn-primary" onClick={this.onAddClick}>Adicionar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.props.spinner ?
                            <img alt="Spinner" src={spinner} width="60" height="60" />
                            :
                            <div className="col-sm-5 col-sm-offset-4" >
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="col-md-2" style={{ textAlign: 'center' }}>Código</th>
                                                <th className="col-md-8">Descrição</th>
                                                <th className="col-md-2" style={{ textAlign: 'center' }}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.contacts.length ? this.props.contacts.map(contact => {
                                                return (
                                                    <tr key={contact.id}>
                                                        <td className="col-md-2">{contact.id}</td>
                                                        <td className="col-md-8" style={{ textAlign: 'left' }}>{
                                                            this.state.contactInEdit.id !== contact.id ? contact.name : <div>
                                                            <input
                                                                type="text"
                                                                style={{height: '20px', fontSize: '13px'}}
                                                                className="form-control"
                                                                value={this.state.contactInEdit.name}
                                                                onChange={(e) => this.onEditChange(e.currentTarget.value)}
                                                            /> </div>
                                                            }</td>
                                                        <td className="col-md-2">
                                                            { this.state.contactInEdit.id !== contact.id ? <a onClick={() => this.onEditClick(contact)}><img alt="Edit" src={edit} width="20" height="20" style={{marginRight: "15px"}} /></a>
                                                            : <a onClick={this.onSave}><img alt="Save" src={save} width="20" height="20" style={{marginRight: "15px"}} /></a> }
                                                            <a onClick={() => this.onRemoveClick(contact)}><img alt="Remove" src={remove} width="20" height="20" /></a>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : (<tr><td colSpan='2'>Não existem tarefas</td></tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ContactActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactApp);