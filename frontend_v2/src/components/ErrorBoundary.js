import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Neķerta kļūda:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
          <h1 className="text-4xl font-bold mb-4">Kaut kas nogāja greizi.</h1>
          <p className="text-lg mb-4">Lūdzu, mēģiniet vēlreiz vēlāk.</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
