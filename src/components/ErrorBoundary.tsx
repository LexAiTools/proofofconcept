import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-2xl w-full space-y-4">
            <h1 className="text-3xl font-bold text-destructive">Wystąpił błąd</h1>
            <p className="text-muted-foreground">Aplikacja napotkała nieoczekiwany problem.</p>
            <div className="bg-muted p-4 rounded-lg overflow-auto">
              <pre className="text-sm">
                {this.state.error?.toString()}
                {"\n\n"}
                {this.state.error?.stack}
              </pre>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Przeładuj stronę
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
