export interface ClickAnimationState {
    mouseX: number
    mouseY: number
    // Progress is a number from 0 to 1, where 1 means we are done with the click
    // animation
    progress: number
}

export interface MousePosition {
    x: number | null
    y: number | null
}
