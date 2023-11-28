import { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.bgColor = null;
    }
    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            borderWidth: '2px',
            borderStyle: 'solid',
            fontWeight: 'bolder',
            borderRadius: '7px',
            borderColor: this.color,
            textAlign: 'center',
            fontSize: '12px',
            margin: '10px 0',
            padding: '10px',
        };
    };
    render() {
        return (
            <div className='Alert'>
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#ffffff';
        this.bgColor = '#0d6efd';
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#ffffff';
        this.bgColor = '#ffc107';
    }
}

class DangerAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#ffffff';
        this.bgColor = '#dc3545';
    }
}

export { InfoAlert, WarningAlert, DangerAlert };
