import { useMouse } from 'rooks'
import { useCallback } from 'react'

export function useDrawAroundMouse() {
    const mousePosition = useMouse()

    const draw = useCallback(
        (context: CanvasRenderingContext2D) => {
            // This is a bit hacky, but need to avoid width and height differences
            // in canvas vs screen. Otherwise, need to use a scaling factor.
            // https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
            context.canvas.width = window.innerWidth
            context.canvas.height = window.innerHeight

            const { width, height } = context.canvas

            if (
                mousePosition.clientX !== null &&
                mousePosition.clientY !== null
            ) {
                const { clientX: mouseX, clientY: mouseY } = mousePosition

                // Want to go from white to darker text in a smooth pattern
                const gradient = context.createRadialGradient(
                    mouseX,
                    mouseY,
                    20,
                    mouseX,
                    mouseY,
                    0.1 * Math.max(width, height)
                )
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)')
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.98)')

                context.fillStyle = gradient
                // Calculate radius of a circle covering entire rectangle
                const maxR = Math.sqrt(
                    Math.pow(Math.max(mouseX, width - mouseX), 2) +
                        Math.pow(Math.max(mouseY, height - mouseY), 2)
                )
                context.arc(mouseX, mouseY, maxR, 0, 2 * Math.PI)
                context.fill()
                context.stroke()
            }
        },
        [mousePosition.clientX, mousePosition.clientY]
    )

    return draw
}
