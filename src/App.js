import React, { useState, useEffect } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";
import TimeWorkedToday from "./components/TimeWorkedToday/TimeWorkedToday";
import DailyChecklist from "./components/DailyChecklist/DailyChecklist";

function App() {
    const [positions, setPositions] = useState({});

    // Load positions from local storage on component mount
    useEffect(() => {
        const storedPositions = localStorage.getItem('componentPositions');
        if (storedPositions) {
            setPositions(JSON.parse(storedPositions));
        }
    }, []);

    // Save positions to local storage on component update
    useEffect(() => {
        localStorage.setItem('componentPositions', JSON.stringify(positions));
    }, [positions]);

    const handleDragStop = (componentKey, e, { x, y }) => {
        setPositions(prevPositions => ({
            ...prevPositions,
            [componentKey]: { x, y }
        }));
    };

    return (
        <div className="App">
            <Draggable onStop={(e, data) => handleDragStop('pomodoroTimer', e, data)} defaultPosition={positions.pomodoroTimer} cancel=".no-drag">
                <div style={{ width: '500px' }}>
                    <PomodoroTimer />
                </div>
            </Draggable>

            {/*<Draggable onStop={(e, data) => handleDragStop('timeWorkedToday', e, data)} defaultPosition={positions.timeWorkedToday} cancel=".no-drag">*/}
            {/*    <div style={{ width: '500px' }}>*/}
            {/*        <TimeWorkedToday />*/}
            {/*    </div>*/}
            {/*</Draggable>*/}

            <Draggable onStop={(e, data) => handleDragStop('dailyChecklist', e, data)} defaultPosition={positions.dailyChecklist} cancel=".no-drag">
                <div style={{ width: '500px' }}>
                    <DailyChecklist />
                </div>
            </Draggable>
        </div>
    );
}

export default App;
