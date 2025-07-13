import React from 'react';
import styles from './Main.module.css';

interface MainProps {
  children: React.ReactNode;
}

export class Main extends React.Component<MainProps> {
  render() {
    return <main className={styles.searchPage}>{this.props.children}</main>;
  }
}
