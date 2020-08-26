import React, { useState, useEffect, ReactNode } from 'react';
import './styles.css';

const Popup = ({ children, visible, onClose = () => {} }: PopupProps) => {
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    const handleClose = () => {
        onClose();
        setIsVisible(!isVisible);
    };

    return (
        <div className={`brdr popup-container${isVisible ? '' : ' hidden'}`}>
            <div className="popup-close" onClick={handleClose}>
                X
            </div>
            {isVisible && <div className="popup-content">{children}</div>}
        </div>
    );
};

interface PopupProps {
    children: ReactNode;
    visible: boolean;
    onClose: Function;
}

export default Popup;
