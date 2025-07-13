import React from 'react';
import './Main.module.css';

interface MainProps {
  children: React.ReactNode;
}

export class Main extends React.Component<MainProps> {
  render() {
    return <main className="search-page">{this.props.children}</main>;
  }
}
