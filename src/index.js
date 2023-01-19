import React from 'react';
import { createRoot } from 'react-dom-client';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App />);

// import React from 'react';
// import ReactDOM from 'react-dom';

import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

// const root = ReactDOM.createRoot()

// ReactDOM.render( 
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );    
{/* <App />, document.getElementById('root')); */}

 const container = document.getElementById('root'); 
 const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<React.StrictMode>
       <App /> 
    </React.StrictMode>);
