import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider
import store from './redux/store';  // Import your Redux store
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  {/* Wrap App with Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
