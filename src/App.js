import logo from './logo.svg';
import './App.css';
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";
import TimeWorkedToday from "./components/TimeWorkedToday/TimeWorkedToday";

function App() {
  return (
    <div className="App">
      <PomodoroTimer/>

      <TimeWorkedToday/>
    </div>
  );
}

export default App;
