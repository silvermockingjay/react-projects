import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
}

export class Section extends React.Component<SectionProps> {
  render() {
    return (
      <section className={styles.pageSection}>{this.props.children}</section>
    );
  }
}
