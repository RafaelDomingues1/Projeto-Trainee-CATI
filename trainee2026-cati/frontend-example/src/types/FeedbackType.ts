export type FeedbackType =
    | 'success'
    |'prerequisite'
    |'creditLimit'
    |'scheduleConflict'
    | 'error'

export interface FeedbackData {
    type: FeedbackType
    title: string
    message : string
}