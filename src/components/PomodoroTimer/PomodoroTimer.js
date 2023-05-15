import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, TextField, Switch, FormControlLabel } from "@material-ui/core";

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
            formattedTime += `${hours}h `;
        }

        if (minutes > 0 || (hours > 0 && seconds > 0)) {
            formattedTime += `${minutes}m `;
        }

        if (seconds >= 0 && (hours === 0 && minutes === 0)) {
            formattedTime += `${seconds}s`;
        }


        return formattedTime.trim();
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Pomodoro Timer</h1>
            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={timerDuration}
                onComplete={handleComplete}
                colors="#ff0000"
                // onComplete={() => new Audio("SoundEffect.mp3").play()} // Play sound when the timer ends
            >
                {({ remainingTime }) => <div>{formatTime(remainingTime)}</div>}
            </CountdownCircleTimer>
            <Button variant="contained" color="primary" onClick={handleStartPause}>
                {isPlaying ? "Pause" : "Start"}
            </Button>
            <TextField
                label="Work Duration"
                type="number"
                onChange={(e) => {
                    if (!isPlaying && e.target.value !== '') {
                        setTimerDuration(e.target.value * 60);
                    }
                }}
                InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
                label="Break Duration"
                type="number"
                onChange={(e) => {
                    if (!isPlaying && e.target.value !== '') {
                        setTimerDuration(e.target.value * 60);
                    }
                }}
                InputProps={{ inputProps: { min: 1 } }}
            />

            <FormControlLabel
                control={<Switch checked={autoStartBreak} onChange={() => setAutoStartBreak(!autoStartBreak)} />}
                label="Auto Start Break"
            />
            <FormControlLabel
                control={<Switch checked={autoStartFlow} onChange={() => setAutoStartFlow(!autoStartFlow)} />}
                label="Auto Start Flow"
            />
        </div>
    );
};

export default PomodoroTimer;