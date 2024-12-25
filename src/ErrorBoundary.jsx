import React from 'react';
import ErrorBoundaryPage from './Auth/Pages/ErrorBoundaryPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryPage/>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
