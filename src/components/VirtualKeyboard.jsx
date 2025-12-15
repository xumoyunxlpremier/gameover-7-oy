import { useState, useEffect } from 'react';

function VirtualKeyboard({ onInput, onEnter, onEscape, isOpen, onToggle }) {
    const [currentInput, setCurrentInput] = useState('');
    const [capsLock, setCapsLock] = useState(false);

    // Keyboard 
    const keys = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];

    const handleKeyClick = (key) => {
        const char = capsLock ? key.toUpperCase() : key;
        const newInput = currentInput + char;
        setCurrentInput(newInput);
        onInput(newInput);
    };

    const handleBackspace = () => {
        const newInput = currentInput;
        setCurrentInput(newInput);
        onInput(newInput);
    };

    const handleSpace = () => {
        const newInput = currentInput + ' ';
        setCurrentInput(newInput);
        onInput(newInput);
    };

    const handleEnter = () => {
        if (currentInput.trim()) {
            onEnter(currentInput.trim());
            setCurrentInput('');
        }
    };

    const handleEscape = () => {
        setCurrentInput('');
        onInput('');
        onEscape();
    };

    const handleCapsLock = () => {
        setCapsLock(!capsLock);
    };

    // tozalash yopilgandan
    useEffect(() => {
        if (!isOpen) {
            setCurrentInput('');
        }
    }, [isOpen]);

    return (
        <>
            {/* Toggle Button */}
            <button
                className="keyboard-toggle-btn"
                onClick={onToggle}
                aria-label="Toggle virtual keyboard"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                    <line x1="6" y1="10" x2="6" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="9" y1="10" x2="9" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="15" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="18" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="7" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {/* Virtual Keyboard */}
            {isOpen && (
                <div className="virtual-keyboard-overlay">
                    <div className="virtual-keyboard">
                        {/* Display */}
                        <div className="keyboard-display">
                            <input
                                type="text"
                                value={currentInput}
                                readOnly
                                placeholder="Type using virtual-keyboard..."
                                className="keyboard-input"
                            />
                        </div>

                        {/* Keys */}
                        <div className="keyboard-keys">
                            {/* ESC and special keys row */}
                            <div className="keyboard-row">
                                <button
                                    className="key special-key esc-key"
                                    onClick={handleEscape}
                                >
                                    ESC
                                </button>
                                <button
                                    className={`key special-key caps-key ${capsLock ? 'active' : ''}`}
                                    onClick={handleCapsLock}
                                >
                                    CAPS
                                </button>
                                <button
                                    className="key special-key backspace-key"
                                    onClick={handleBackspace}
                                >
                                    ⌫
                                </button>
                            </div>

                            {/* Letter rows */}
                            {keys.map((row, rowIndex) => (
                                <div key={rowIndex} className="keyboard-row">
                                    {row.map((key) => (
                                        <button
                                            key={key}
                                            className="key letter-key"
                                            onClick={() => handleKeyClick(key)}
                                        >
                                            {capsLock ? key.toUpperCase() : key}
                                        </button>
                                    ))}
                                </div>
                            ))}

                            {/* Bottom row */}
                            <div className="keyboard-row">
                                <button
                                    className="key special-key space-key"
                                    onClick={handleSpace}
                                >
                                    SPACE
                                </button>
                                <button
                                    className="key special-key enter-key"
                                    onClick={handleEnter}
                                >
                                    ENTER ↵
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default VirtualKeyboard;