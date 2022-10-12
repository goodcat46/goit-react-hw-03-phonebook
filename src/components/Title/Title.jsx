import React from 'react';
import PropTypes from 'prop-types';
import css from './title.module.css'

const Title = ({ title }) => {
  return <p className={css.title}>{title}</p>;
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
