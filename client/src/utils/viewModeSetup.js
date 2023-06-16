import React from 'react';
import {setEditModeToZero, setViewModeToOne, setViewModeToZero, removeViewMode} from './localStorage'

export function viewModeOn(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            setViewModeToOne();
            setEditModeToZero();
        }

        componentWillUnmount() {
            setViewModeToZero();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

export function ViewModeOff(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            setViewModeToZero();
        }

        componentWillUnmount() {
            setViewModeToOne();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

export function deleteViewMode(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            removeViewMode();
        }

        componentWillUnmount() {
            setViewModeToZero();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

