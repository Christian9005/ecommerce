import React, {FC} from 'react';
import "./button.scss";

interface ButtonProps {
    text: string;
    variant?: 'primary' | 'secondary';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    onClick?: () => void;
}
const Button:FC<ButtonProps> = ({text, variant,size,onClick}) => {
    const buttonClassName = `button ${variant} ${size}`;
    return (
        <div>
            <button className={buttonClassName} onClick={onClick}>
                {text}
            </button>
        </div>
    );
};

export default Button;