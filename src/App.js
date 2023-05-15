import './App.css';
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";
import TimeWorkedToday from "./components/TimeWorkedToday/TimeWorkedToday";
import DailyChecklist from "./components/DailyChecklist/DailyChecklist";

function App() {
  return (
    <div className="App">
      <PomodoroTimer/>
      <TimeWorkedToday/>
        <DailyChecklist/>
    </div>
  );
}

export default App;
