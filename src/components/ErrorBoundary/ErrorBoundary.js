import React from 'react';
import styles from './ErrorBoundary.module.scss';

export default class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Something went wrong</h2>
          <h3 className={styles.error}>
            {error && error.toString()}
          </h3>
          <span className={styles.reload}
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload this page
          </span>
          <p className={styles.errorInfo}>
            {errorInfo && errorInfo.componentStack}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}