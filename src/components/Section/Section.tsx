import React from 'react';
import './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
}

export class Section extends React.Component<SectionProps> {
  render() {
    return <section className="page-section">{this.props.children}</section>;
  }
}
