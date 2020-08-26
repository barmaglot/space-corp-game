import React, { ReactNode } from 'react';
import './styles.css';
import { toggleClassName } from 'App/utils/utils';

const Button = ({ children, className, disabled = false, onClick = () => {} }: ButtonProps) => {
    const buttonClass = toggleClassName(`btn ${className}`, disabled, 'disabled');

    return (
        <div className={buttonClass} onClick={e => onClick(e)}>
            <div className="btn-content">{children}</div>
        </div>
    );
};

interface ButtonProps {
    children: ReactNode;
    className: string;
    disabled: boolean;
    onClick?: Function;
}

export default Button;
