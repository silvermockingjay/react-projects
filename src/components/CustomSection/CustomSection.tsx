import React from 'react';
import styles from './CustomSection.module.css';

interface SectionProps {
  children: React.ReactNode;
}

export class CustomSection extends React.Component<SectionProps> {
  render() {
    return (
      <section className={styles.pageSection}>{this.props.children}</section>
    );
  }
}
