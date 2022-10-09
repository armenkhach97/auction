import React from 'react';
import ReactDOM from 'react-dom';

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import App from "./components/App";

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
  document.getElementById("root")
);
