import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { setupStore } from './app/store/store';
import ThemeProvider from './app/providers/ThemeProvider/ui/ThemeProvider';
import './app/providers/i18n/i18n';
import { ErrorBoundary } from './app/providers/errorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={setupStore}>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
);