import React from 'react';
import styles from './FallBack.module.css';

interface FallBackProps {
  text: string;
}

export class FallBack extends React.Component<FallBackProps> {
  render() {
    return <div className={styles.fallback}>{this.props.text}</div>;
  }
}
