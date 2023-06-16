import React from 'react';
import {setViewModeToZero, setEditModeToOne, setEditModeToZero, removeEditMode} from './localStorage'

export function editModeOn(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            setEditModeToOne();
            setViewModeToZero();
        }

        componentWillUnmount() {
            setEditModeToZero();
            setViewModeToZero();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

export function editModeOff(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            setEditModeToZero();
            setViewModeToZero();
        }

        componentWillUnmount() {
            setEditModeToOne();
            setViewModeToZero();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

export function deleteEditMode(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            removeEditMode();
        }

        componentWillUnmount() {
            setEditModeToZero();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

