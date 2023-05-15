import React, { useState, useEffect } from 'react';

const TimeWorkedToday = () => {
    const [workTimeToday, setWorkTimeToday] = useState(0);

    useEffect(() => {
        const workLog = JSON.parse(localStorage.getItem('workLog'));
        const workTimeToday = workLog.reduce((total, current) => total + current, 0);
        setWorkTimeToday(workTimeToday);
    }, []);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        time %= 3600;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const handleViewWorkLog = () => {
        const workLog = JSON.parse(localStorage.getItem('workLog'));
        console.log(workLog); // Replace with your own logic
    };

    return (
        <div>
            <h1>Time Worked Today</h1>
            <p>{formatTime(workTimeToday)}</p>
            <button onClick={handleViewWorkLog}>View Work Log</button>
        </div>
    );
};

export default TimeWorkedToday;
