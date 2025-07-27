import React from 'react';
import styles from './CustomMain.module.css';

interface MainProps {
  children: React.ReactNode;
}

export class CustomMain extends React.Component<MainProps> {
  render() {
    return <main className={styles.searchPage}>{this.props.children}</main>;
  }
}
