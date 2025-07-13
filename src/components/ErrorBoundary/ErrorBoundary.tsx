import React from 'react';
import { FallBack } from '../FallBack/FallBack';

interface MyProps {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<MyProps, State> {
  state = { hasError: false };

  componentDidCatch(error: Error): void {
    console.error('Error:', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <FallBack text="Something went wrong. Please refresh." />;
    }
    return this.props.children;
  }
}
