import React from 'react';
import styles from './Loader.module.css';

export class Loader extends React.Component {
  render() {
    return <div className={styles.pageLoader}></div>;
  }
}
