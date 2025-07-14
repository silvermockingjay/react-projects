import React from 'react';
import { FallBack } from '../FallBack/FallBack';
import { Main } from '../Main/Main';
import { Section } from '../Section/Section';

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
      return (
        <Main>
          <Section>
            <FallBack text="Something went wrong. Please refresh the page." />
          </Section>
        </Main>
      );
    }
    return this.props.children;
  }
}
