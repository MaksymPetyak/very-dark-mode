import { HTMLProps } from 'react'
import { useDarkModeCanvas } from './useDarkModeCanvas'

const Canvas = ({ ...props }: HTMLProps<HTMLCanvasElement>) => {
    const canvasRef = useDarkModeCanvas()

    return <canvas ref={canvasRef} {...props} />
}

/*
 * When turned on paints a black canvas over the whole screen leaving only a small area around the cursor visible.
 * Click to expand the visible area to the whole screen, but then it fades back to black.
 * If cursor isn't available (e.g. on touchscreen) then only clicking to expand the visible area is possible.
 */
export const VeryDarkMode = ({ isDarkModeOn }: { isDarkModeOn: boolean }) => {
    if (!isDarkModeOn) {
        return null
    }

    return (
        <Canvas
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
