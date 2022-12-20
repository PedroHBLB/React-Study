import React from "react";

import './styles.css';

export class Button extends React.Component {
    render() {
        const { text, onClick, disabled } = this.props;

        return (
            <button disabled={disabled} className="button" onClick={onClick}>{text}</button>
        );
    }
}