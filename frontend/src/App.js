import './App.css';
import DisplayText from './components/DisplayText';
import FileUpload from './components/FileUpload';
import OllamaTestComponent from './components/OllamaTestComponent';
import SummarizeText from './components/SummarizeText';
import SummarizeComponent from './components/SummerizeComponent';

function App() {
  return (
    <div className="App">
      <FileUpload />
      <DisplayText />
      <SummarizeText />
      <OllamaTestComponent />
      <SummarizeComponent />

    </div>
  );
}

export default App;
