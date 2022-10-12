import React from 'react';
import PropTypes from 'prop-types';
import css from './contact.module.css';

const Contact = ({id, name, number, toDeleteContact }) => {
  return (
    <li className={css.contact}>
      <span className={css.contactData}>
        <span className={css.name}>{name}</span>
        <span className={css.number}>{number}</span>
      </span>
      <button className={css.button} onClick={()=>{toDeleteContact(id)}} type="button">
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  toDeleteContact: PropTypes.func,
};

export default Contact;
