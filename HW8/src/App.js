import PW from './PW';
import SI from './Signin';
import EM from './Email';
function App() {
  return (
    <div className='App'>
      <div>{EM()}</div>
      <div>{PW()}</div>
      <div>{SI()}</div>
    </div>
  );
}

export default App;
