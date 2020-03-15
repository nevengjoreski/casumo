import React, {lazy, Suspense} from 'react';
import './App.css';
import Loading from "./components/Loading";

const BigListAgGrid = lazy(() => import('./components/BigListAgGrid'))

function App() {
  return (
      <Suspense fallback={<Loading/>}>
        <BigListAgGrid/>
      </Suspense>

  )
}

export default App;
