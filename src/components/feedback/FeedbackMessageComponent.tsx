import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { FeedbackMessage as FeedbackMessageType } from '../../types/productTypes';

interface FeedbackMessageProps {
    feedback: FeedbackMessageType;
    onClear: () => void;
    autoHideDuration?: number;
}

const FeedbackMessageComponent: React.FC<FeedbackMessageProps> = ({
    feedback,
    onClear,
    autoHideDuration = 5000
}) => {
    useEffect(() => {
        if (feedback.message && autoHideDuration > 0) {
            const timer = setTimeout(() => {
                onClear();
            }, autoHideDuration);

            return () => clearTimeout(timer);
        }
    }, [feedback, onClear, autoHideDuration]);

    if (!feedback.message) {
        return null;
    }

    return (
        <Alert
            variant={feedback.type}
            dismissible
            onClose={onClear}
            className="animate__animated animate__fadeIn"
        >
            {feedback.message}
        </Alert>
    );
};

export default FeedbackMessageComponent;