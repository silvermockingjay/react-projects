import { Component, type ErrorInfo } from 'react';
import { Fallback } from '../FallBack/Fallback';
import { Main } from '../Main/Main';
import { Section } from '../Section/Section';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <Main>
          <Section>
            <Fallback text="Something went wrong. Please refresh the page." />
          </Section>
        </Main>
      );
    }
    return this.props.children;
  }
}
