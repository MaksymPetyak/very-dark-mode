import { useEffect, useRef } from 'react'

export function useSimpleVeryDarkModeCanvas(
    draw: (context: CanvasRenderingContext2D) => void
) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas !== null) {
            const context = canvas.getContext('2d')

            const render = () => {
                if (context !== null) {
                    draw(context)
                }
            }

            render()
        }
    }, [draw])

    return canvasRef
}
