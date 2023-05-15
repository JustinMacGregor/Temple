import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, TextField, Switch, FormControlLabel } from "@material-ui/core";
import "./PomodoroTimer.css"

const PomodoroTimer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWorkTime, setIsWorkTime] = useState(true);
    const [timerDuration, setTimerDuration] = useState(25 * 60); // Default 25 mins
    const [autoStartBreak, setAutoStartBreak] = useState(false);
    const [autoStartFlow, setAutoStartFlow] = useState(false);

    useEffect(() => {
        const workLog = localStorage.getItem("workLog");
        if (workLog) {
            // Load work log from local storage
        } else {
            // Initialize work log in local storage
            localStorage.setItem("workLog", JSON.stringify([]));
        }
    }, []);

    const handleStartPause = () => {
        if (timerDuration === 0 || timerDuration === '') {
            return; // Don't start/pause if duration is blank
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            document.title = formatTime(timerDuration);
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
        };
    }, [timerDuration]);



    const handleComplete = () => {
        let workLog = JSON.parse(localStorage.getItem("workLog"));
        if (isWorkTime) {
            workLog.push(timerDuration);
            localStorage.setItem("workLog", JSON.stringify(workLog));
            // Switch to break time
            setIsWorkTime(false);
            setTimerDuration(5 * 60); // Default 5 mins break
            if (autoStartBreak) setIsPlaying(true);
        } else {
            // Switch to work time
            setIsWorkTime(true);
            setTimerDuration(25 * 60); // Default 25 mins work
            if (autoStartFlow) setIsPlaying(true);
        }
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        let formattedTime = "";

        if (hours > 0) {
            formattedTime += `${hours}h ${minutes}m `;
        } else if (minutes > 0) {
            formattedTime += `${minutes}m `;
        }

        if (seconds > 0 || (hours === 0 && minutes === 0)) {
            formattedTime += `${seconds}s`;
        }

        return formattedTime.trim();
    };



// Pomodoro.js

    return (
        <div className="container">
            <h1>Pomodoro Timer</h1>
            <div className="durations-container">
                <div className="duration-field">
                    <label>Flow</label>
                    <input
                        type="number"
                        value={timerDuration / 60} // Divide by 60 to convert seconds to minutes
                        onChange={(e) => {
                            if (!isPlaying && e.target.value !== '') {
                                setTimerDuration(e.target.value * 60);
                            }
                        }}
                        min={1}
                        disabled={isPlaying} // Disable the field when isPlaying is true
                    />
                    <div className="switch-label">
                        <label>Auto Flow</label>
                        <input
                            type="checkbox"
                            className="switch"
                            checked={autoStartFlow}
                            onChange={() => setAutoStartFlow(!autoStartFlow)}
                        />
                    </div>
                </div>
                <div className="duration-field">
                    <label>Break</label>
                    <input
                        type="number"
                        value={timerDuration / 60} // Divide by 60 to convert seconds to minutes
                        onChange={(e) => {
                            if (!isPlaying && e.target.value !== '') {
                                setTimerDuration(e.target.value * 60);
                            }
                        }}
                        min={1}
                        disabled={isPlaying} // Disable the field when isPlaying is true
                    />
                    <div className="switch-label">
                        <label>Auto Break</label>
                        <input
                            type="checkbox"
                            className="switch"
                            checked={autoStartBreak}
                            onChange={() => setAutoStartBreak(!autoStartBreak)}
                        />
                    </div>
                </div>
            </div>
            <div className="timer">
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={timerDuration}
                    onComplete={handleComplete}
                    colors="#ff0000"
                >
                    {({ remainingTime }) => <div>{formatTime(remainingTime)}</div>}
                </CountdownCircleTimer>
            </div>
            <button className="button" onClick={handleStartPause}>
                {isPlaying ? "Pause" : "Start"}
            </button>
        </div>
    );



};

export default PomodoroTimer;