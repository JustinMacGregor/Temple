import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DailyChecklist.css'; // Importing Styles

const DailyChecklist = () => {
    const storedChecklist = JSON.parse(localStorage.getItem('dailyChecklist')) || [];
    const [checklist, setChecklist] = useState(storedChecklist);


    const storedResetTime = localStorage.getItem('resetTime') || '00:00';
    const [resetTime, setResetTime] = useState(storedResetTime);

    const [item, setItem] = useState('');

    const moveItem = (index, direction) => {
        const newChecklist = [...checklist];
        const [item] = newChecklist.splice(index, 1);
        newChecklist.splice(index + direction, 0, item);
        setChecklist(newChecklist);
    };

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

    const deleteItem = index => {
        const newChecklist = [...checklist];
        newChecklist.splice(index, 1);
        setChecklist(newChecklist);
    };

    const handleOnDragEnd = result => {
        if (!result.destination) return;
        const items = Array.from(checklist);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setChecklist(items);
    };

    return (
        <div className="daily-checklist">
            <h1 className="daily-checklist__title">Daily Checklist</h1>
            <div className="no-drag">
                <ul className="daily-checklist__items">
                    {checklist.map(({ text, checked }, index) => (
                        text !== undefined && checked !== undefined ? (
                            <li key={`item-${index}`}>
                                <div className="daily-checklist__item">
                                    <button
                                        className="daily-checklist__up-button"
                                        disabled={index === 0}
                                        onClick={() => moveItem(index, -1)}
                                    >
                                        ↑
                                    </button>
                                    <button
                                        className="daily-checklist__down-button"
                                        disabled={index === checklist.length - 1}
                                        onClick={() => moveItem(index, 1)}
                                    >
                                        ↓
                                    </button>
                                    <input
                                        className="daily-checklist__checkbox"
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleItem(index)}
                                    />
                                    <label className="daily-checklist__label">{text}</label>
                                    <button
                                        className="daily-checklist__delete-button"
                                        onClick={() => deleteItem(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ) : null
                    ))}
                </ul>
                <input
                    className="daily-checklist__input"
                    value={item}
                    onChange={e => setItem(e.target.value)}
                    placeholder="Add new item"
                />
                <button className="daily-checklist__button" onClick={addItem}>Add</button>
                <label className="daily-checklist__reset-label">Reset Time</label>
                <input
                    className="daily-checklist__reset-input"
                    type="time"
                    value={resetTime}
                    onChange={e => setResetTime(e.target.value)}
                />
            </div>
        </div>
    );
};

export default DailyChecklist;
