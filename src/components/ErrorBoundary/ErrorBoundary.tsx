import React from 'react';
import './ErrorBoundary.module.css';
import { FallBack } from '../FallBack/FallBack';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component {
  state: State = { hasError: false };

  componentDidCatch(error: Error): void {
    console.error('Error:', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <FallBack text="Something went wrong. Please refresh." />;
    }
  }
}
