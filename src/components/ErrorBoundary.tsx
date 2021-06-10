import { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorPage } from 'src/pages/ErrorPage';
import { getLogger } from 'src/utils/logger';

interface PropTypes {
    children: React.ReactNode;
}

interface State {
    error: Error | null;
}

/**
 * Our app relies on handling errors at a central location to ensure consistent
 * reporting and consumption of any error-based states.
 *
 * Any error-based state, such as a non-recoverable network error, validation
 * error, etc., should be thrown from a Component to be caught and handled
 * in the ErrorBoundary.
 */
export class ErrorBoundary extends Component<PropTypes, State> {
    state = {
        error: null,
    };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        getLogger().error(error, info);
    }

    render(): ReactNode {
        const { children } = this.props;
        const { error } = this.state;

        // eslint-disable-next-line
        return error ? <ErrorPage error={error!} /> : children;
    }
}
