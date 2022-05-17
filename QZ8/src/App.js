import './App.css';
import MultiButton  from './cgu_multiButton';
import HelloCGU from './cgu_hello';
function App() {  
  return(
    <div className="App">
        {HelloCGU()}
        { MultiButton(10)}
    </div>
  );
}
export default App;
