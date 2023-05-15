import React, { useState, useEffect } from 'react';
import './DailyChecklist.css'; // Importing Styles

const DailyChecklist = () => {
    const [checklist, setChecklist] = useState([]);
    const [resetTime, setResetTime] = useState('00:00');
    const [item, setItem] = useState('');

    // Load checklist from localStorage on component mount
    useEffect(() => {
        const storedChecklist = localStorage.getItem('dailyChecklist');
        if (storedChecklist) {
            setChecklist(JSON.parse(storedChecklist));
        }

        const storedResetTime = localStorage.getItem('resetTime');
        if (storedResetTime) {
            setResetTime(storedResetTime);
        }
    }, []);

    // Save checklist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('dailyChecklist', JSON.stringify(checklist));
    }, [checklist]);

    // Save reset time to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('resetTime', resetTime);
    }, [resetTime]);

    // Check for reset every minute
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentTime = now.toISOString().slice(11,16);

            if (currentTime === resetTime) {
                setChecklist(checklist.map(item => ({ ...item, checked: false })));
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [checklist, resetTime]);

    const addItem = () => {
        setChecklist([...checklist, { text: item, checked: false }]);
        setItem('');
    };

    const toggleItem = index => {
        const newChecklist = [...checklist];
        newChecklist[index].checked = !newChecklist[index].checked;
        setChecklist(newChecklist);
    };

    return (
        <div className="daily-checklist">
            <h1>Daily Checklist</h1>
            {checklist.map((item, index) => (
                <div key={index}>
                    <input type="checkbox" checked={item.checked} onChange={() => toggleItem(index)} />
                    <label>{item.text}</label>
                </div>
            ))}
            <input value={item} onChange={e => setItem(e.target.value)} placeholder="Add new item" />
            <button onClick={addItem}>Add</button>
            <label>Reset Time</label>
            <input type="time" value={resetTime} onChange={e => setResetTime(e.target.value)} />
        </div>
    );
};

export default DailyChecklist;
