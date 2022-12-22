import { ClickAnimationState, MousePosition } from './types'

// http://stackoverflow.com/a/12895687/1250044
export function clearArc(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number
) {
    context.save()
    context.globalCompositeOperation = 'destination-out'
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI, false)
    context.fill()
    context.restore()
}

export function drawFadingCircle(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    gradientStartColor = 'rgba(255, 255, 255, 0.2)'
) {
    clearArc(context, x, y, radius)

    context.save()

    context.beginPath()
    const grd = context.createRadialGradient(x, y, 0.1 * radius, x, y, radius)
    grd.addColorStop(0, gradientStartColor)
    grd.addColorStop(1, `rgba(0, 0, 0, 0.98)`)
    context.fillStyle = grd
    context.arc(x, y, radius, 0, 2 * Math.PI)
    context.fill()
    context.stroke()

    context.restore()
}

export function drawDarkRectangle(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
) {
    context.save()
    context.fillStyle = 'rgba(0, 0, 0, 0.98)'
    context.fillRect(0, 0, width, height)
    context.restore()
}

export const drawExpandingClickState = (
    context: CanvasRenderingContext2D,
    click: ClickAnimationState
) => {
    const { width, height } = context.canvas

    const x = click.mouseX
    const y = click.mouseY
    const maxR = Math.sqrt(
        Math.pow(Math.max(x, width - x), 2) +
            Math.pow(Math.max(y, height - y), 2)
    )

    const progress = easeOutCubic(click.progress)

    // Keep small part around the cursor clear
    const clearRadius = 0.1 * Math.max(width, height)
    const currentRadius = clearRadius + progress * maxR

    // We start expanding with a completely white circle but make it darker as it
    // expands so that the transition back to dark filled screen feels natural
    const colorValue = 1 - progress * 255
    const colorTransparency = progress * 0.98
    const gradientStartColor = `rgba(${colorValue}, ${colorValue}, ${colorValue}, ${colorTransparency})`

    drawFadingCircle(context, x, y, currentRadius, gradientStartColor)
}

// Registers event listener for mousedown and returns a function to remove it
export function registerMouseClickListener(activeClick: {
    click: ClickAnimationState | null
}): () => void {
    const handleClick = (e: MouseEvent) => {
        if (activeClick.click === null) {
            activeClick.click = {
                mouseX: e.clientX,
                mouseY: e.clientY,
                progress: 0,
            }
        }
    }
    document.addEventListener('mousedown', handleClick)

    return () => document.removeEventListener('mousedown', handleClick)
}

// Registers event listener for mouse move and returns a function to remove it
export function registerMouseMoveListener(mousePos: MousePosition): () => void {
    const handleMouseMove = (e: MouseEvent) => {
        mousePos.x = e.clientX
        mousePos.y = e.clientY
    }
    document.addEventListener('mousemove', handleMouseMove)

    return () => document.removeEventListener('mousemove', handleMouseMove)
}

export const resizeCanvas = (context: CanvasRenderingContext2D) => {
    const canvas = context.canvas
    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window
        canvas.width = width * ratio
        canvas.height = height * ratio
        context.scale(ratio, ratio)
        return true
    }
    return false
}

function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3)
}
