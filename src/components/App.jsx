import css from './app.module.css';
import React, { Component } from 'react';
import Title from './Title/Title';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import localstorage from 'js/localstorage';
let contactsArr = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
localstorage.save('contacts', contactsArr);

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  getContacts = () => {
    return localstorage.load('contacts');
  };
  handleAddContact = ({ id, name, number }) => {
    const namesArr = this.getContacts().map(el => el.name.toLowerCase());
    let contacts = this.getContacts();
    if (!namesArr.includes(name.toLowerCase())) {
      localstorage.save('contacts', [
        ...contacts,
        { id, name: name, number: number },
      ]);
      this.setState(() => ({
        contacts: this.getContacts(),
      }));
    } else {
      alert(`"${name}" is already added to contact list.`);
    }
  };
  handleDeleteContact = userId => {
    localstorage.save(
      'contacts',
      this.getContacts().filter(user => user.id !== userId)
    );
    this.setState(() => ({
      contacts: this.getContacts(),
    }));
  };
  handleChangeSearch = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };
  applyFilter = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) => {
      if (filter && !name.toLowerCase().includes(filter.toLowerCase()))
        return false;
      return true;
    });
  };
  componentDidMount() {
    this.setState({ contacts: this.getContacts() });
  }
  render() {
    const { filter } = this.state;
    return (
      <div className={css.app}>
        <div className={css.appContainer}>
          <Title title="Add contact" />
          <ContactForm toAddContact={this.handleAddContact} />
          <Title title="Find contact" />
          <Filter filter={filter} onChangeInput={this.handleChangeSearch} />
          <ContactList
            contactList={this.applyFilter()}
            toDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}
