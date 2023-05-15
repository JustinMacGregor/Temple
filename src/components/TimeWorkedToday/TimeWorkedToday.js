import React, { useState, useEffect } from 'react';

const TimeWorkedToday = () => {
    const [workTimeToday, setWorkTimeToday] = useState(0);
    const [workGoal, setWorkGoal] = useState(480); // Default work goal of 480 minutes (8 hours)
    const [workProgress, setWorkProgress] = useState(0);

    useEffect(() => {
        const workLog = JSON.parse(localStorage.getItem('workLog')) || [];
        const totalWorkTime = workLog.reduce((total, current) => total + current, 0);
        setWorkTimeToday(totalWorkTime);

        const progress = (totalWorkTime / (workGoal * 60)) * 100;
        setWorkProgress(progress);
    }, [workGoal]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        time %= 3600;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const handleViewWorkLog = () => {
        const workLog = JSON.parse(localStorage.getItem('workLog')) || [];
        console.log(workLog); // Replace with your own logic
    };

    const handleSetWorkGoal = (event) => {
        const minutes = parseInt(event.target.value, 10);
        setWorkGoal(minutes);
    };

    return (
        <div className="container">
            <div className="no-drag">
                <h1 className="heading">Time Worked Today</h1>
                <p className="time">{formatTime(workTimeToday)}</p>
                <div className="input-container">
                    <label htmlFor="workGoalInput" className="label">Set Work Goal (minutes):</label>
                    <input
                        id="workGoalInput"
                        type="number"
                        min="0"
                        value={workGoal}
                        onChange={handleSetWorkGoal}
                        className="input"
                    />
                </div>
                <progress className="progress" value={workTimeToday} max={workGoal * 60} />
                <p className="progress-text">{`${Math.round(workProgress)}% completed`}</p>
                <button onClick={handleViewWorkLog} className="button">View Work Log</button>
            </div>
        </div>
    );

};

export default TimeWorkedToday;
