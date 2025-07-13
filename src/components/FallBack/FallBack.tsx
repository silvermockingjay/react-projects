import React from 'react';
import './FallBack.module.css';

interface FallBackProps {
  text: string;
}

export class FallBack extends React.Component<FallBackProps> {
  render() {
    return <div className="fallback">{this.props.text}</div>;
  }
}
