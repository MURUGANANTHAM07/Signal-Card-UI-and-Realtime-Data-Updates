// SignalCard.js (React Component)
import React, { useEffect, useState } from 'react';

const SignalCard = ({ id, initialState, type }) => {
    const [signalState, setSignalState] = useState(initialState);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000/ws');
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.id === id) {
                setSignalState(data.state);
            }
        };
        return () => {
            socket.close();
        };
    }, [id]);

    const getSignalClass = (state) => {
        switch (state) {
            case 'green': return 'green';
            case 'yellow': return 'yellow';
            case 'red': return 'red';
            default: return '';
        }
    };

    return (
        <div className={`signal-card ${getSignalClass(signalState)}`}>
            <div className="signal-header">{`Signal ${id}`}</div>
            <div className="signal-body">
                {type === 'two-state' ? 
                    <div className={`signal-circle ${getSignalClass(signalState)}`} /> :
                    <>
                        <div className={`signal-circle red`} />
                        <div className={`signal-circle yellow`} />
                        <div className={`signal-circle green`} />
                    </>
                }
            </div>
        </div>
    );
};

export default SignalCard;
