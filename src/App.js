import React from 'react';
import SignalCard from './SignalCard';
import './SignalCard.css'; // Import the CSS for SignalCard component

const App = () => {
    return ( <
        div className = "App" >
        <
        h1 > Signal Cards < /h1> <
        div className = "signal-cards" >
        <
        SignalCard id = { 1 }
        initialState = "green"
        type = "two-state" / >
        <
        SignalCard id = { 2 }
        initialState = "yellow"
        type = "three-state" / >
        <
        SignalCard id = { 3 }
        initialState = "red"
        type = "two-state" / >
        <
        /div> <
        /div>
    );
};

export default App;
