import { HTMLProps } from 'react'
import { useDrawAroundMouse } from '../SimpleVeryDarkMode/useDrawAroundMouse'
import { useSimpleVeryDarkModeCanvas } from './useSimpleVeryDarkModeCanvas'

type CanvasProps = {
    draw: (context: CanvasRenderingContext2D) => void
} & HTMLProps<HTMLCanvasElement>

const Canvas = ({ draw, ...props }: CanvasProps) => {
    const canvasRef = useSimpleVeryDarkModeCanvas(draw)

    return <canvas ref={canvasRef} {...props} />
}

/*
 * Simple version of dark mode only with cursor, no pulsing on click or responsiveness.
 * When turned on paints a black canvas over the whole screen leaving only a small
 * area around the cursor visible
 * Left here mostly for educational purposes, see VeryDarkMode component for the full
 * version.
 */
export const SimpleVeryDarkMode = ({
    isDarkModeOn,
}: {
    isDarkModeOn: boolean
}) => {
    const draw = useDrawAroundMouse()

    if (!isDarkModeOn) {
        return null
    }

    return (
        <Canvas
            draw={draw}
            style={{
                position: 'fixed',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%',
                margin: 0,
                zIndex: 99,
                // pointerEvents none lets you click "through" the canvas to
                // interact with the elements beneath
                pointerEvents: 'none',
            }}
        />
    )
}
