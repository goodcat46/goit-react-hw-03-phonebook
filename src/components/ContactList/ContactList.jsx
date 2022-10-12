import React from 'react';
import PropTypes from 'prop-types';
import css from './contactList.module.css';
import Contact from './Contact/Contact';


const ContactList = ({ contactList, toDeleteContact }) => {
  return (
    <ul className={css.contactList}>
      {contactList.map(el => (
        <Contact
          key={el.id}
          id={el.id}
          name={el.name}
          number={el.number}
          toDeleteContact={toDeleteContact}
        />
      ))}
      {contactList.length === 0 && (
        <li className={css.notification}>Not founded contacts</li>
      )}
    </ul>
  );
};

ContactList.propTypes = {
  contactList: PropTypes.array,
  toDeleteContact: PropTypes.func,
};

export default ContactList;
