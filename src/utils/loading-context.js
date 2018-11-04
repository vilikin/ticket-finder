import React from 'react';
let context;

export function getLoadingContext() {
  if (!context) {
    context = React.createContext();
  }

  return context;
}

export class LoadingContextProvider extends React.Component {
  state = {
    loading: false,
    progress: 0.00,
  }

  setLoading = (loading) => {
    this.setState({
      loading,
      progress: loading ? 0.00 : 1.00,
    });
  }

  setProgress = (progress) => {
    this.setState({
      progress,
    });
  }

  render() {
    const LoadingContext = getLoadingContext();

    return (
      <LoadingContext.Provider value={{
        ...this.state,
        setLoading: this.setLoading,
        setProgress: this.setProgress,
      }}>
        {this.props.children}
      </LoadingContext.Provider>
    );
  }
}