import React, { forwardRef }from "react";
import '../styles/GameBtn.css'

const GameBtn = forwardRef(( {className, onClick, color}, ref) => (
        <button
        color={color}
        className={`game-button ${className}`}
        ref={ref}
        onClick={onClick}
        />

));
export default GameBtn