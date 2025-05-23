export interface FeedbackMessage {
    message: string;
    type: 'success' | 'danger' | 'warning' | 'info' | '';
}