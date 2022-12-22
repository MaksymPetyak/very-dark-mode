import { useEffect, useRef } from 'react'
import {
    drawDarkRectangle,
    drawExpandingClickState,
    drawFadingCircle,
    registerMouseClickListener,
    registerMouseMoveListener,
    resizeCanvas,
} from './drawingUtils'
import { ClickAnimationState, MousePosition } from './types'

const CLICK_ANIMATION_STEP_SIZE = 0.006
const CLEAR_RADIUS_FRACTION = 0.04

export function useDarkModeCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // We clear visible area around cursor, so need to check that it's available
    const isPointerAvailable = window.matchMedia('(any-pointer: fine)').matches

    useEffect(() => {
        const canvas = canvasRef.current
        const activeClick: { click: ClickAnimationState | null } = {
            click: null,
        }
        const mousePosition: MousePosition = { x: null, y: null }
        let pointerClearRadius = 0

        const mouseClickListenerCleanup =
            registerMouseClickListener(activeClick)
        const mouseMoveListenerCleanup =
            registerMouseMoveListener(mousePosition)

        if (canvas !== null) {
            const context = canvas.getContext('2d')
            let animationFrameId: number

            if (context !== null) {
                const render = () => {
                    resizeCanvas(context)
                    const { width, height } = context.canvas

                    context.clearRect(0, 0, width, height)
                    drawDarkRectangle(context, width, height)

                    if (activeClick.click !== null) {
                        drawExpandingClickState(context, activeClick.click)
                        activeClick.click.progress += CLICK_ANIMATION_STEP_SIZE
                        if (activeClick.click.progress >= 1) {
                            activeClick.click = null
                            pointerClearRadius = 0
                        }
                    }

                    if (
                        isPointerAvailable &&
                        activeClick.click === null &&
                        mousePosition.x !== null &&
                        mousePosition.y !== null
                    ) {
                        const maxClearRadius =
                            CLEAR_RADIUS_FRACTION * Math.max(width, height)
                        pointerClearRadius = Math.min(
                            pointerClearRadius + 0.01 * maxClearRadius,
                            maxClearRadius
                        )
                        drawFadingCircle(
                            context,
                            mousePosition.x,
                            mousePosition.y,
                            pointerClearRadius
                        )
                    }

                    animationFrameId = window.requestAnimationFrame(render)
                }

                render()
            }
            return () => {
                mouseClickListenerCleanup()
                mouseMoveListenerCleanup()
                window.cancelAnimationFrame(animationFrameId)
            }
        }
    }, [isPointerAvailable])

    return canvasRef
}
