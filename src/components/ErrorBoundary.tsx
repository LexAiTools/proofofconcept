import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">Oops!</h1>
              <p className="text-lg text-muted-foreground">
                Coś poszło nie tak. Przepraszamy za niedogodności.
              </p>
            </div>
            
            {this.state.error && (
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-destructive font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <Button onClick={this.handleReset} className="w-full">
              Wróć do strony głównej
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
