import React from 'react';
import PropTypes from 'prop-types';
import css from './filter.module.css';

const Filter = ({ filter, onChangeInput, applyFilter, toDeleteContact }) => {
  return (
    <div className={css.filter}>
      <div className={css.div}>
        <label className={css.label} htmlFor="filter">
          Filter
        </label>
        <input
          className={css.input}
          name="filter"
          type="text"
          id="filter"
          placeholder="Enter name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={filter}
          required
          onChange={onChangeInput}
        />
      </div>

    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChangeInput: PropTypes.func,
  applyFilter: PropTypes.func,
  toDeleteContact: PropTypes.func,
};

export default Filter;
