import styled from 'styled-components'
import React from 'react'

const StyledText = styled.p`
    font-size: 1.75rem;
    display: block;
    font-family: Dancing Script;
    line-height: 3rem;
`

export const DayText = () => {
    return (
        <StyledText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
            Nam nec erat ante. Nunc bibendum non mi facilisis efficitur. <br />
            Pellentesque justo quam, laoreet vitae efficitur sit amet, elementum
            sed enim. <br />
            Mauris faucibus diam non diam dictum, nec tempus purus placerat.{' '}
            <br />
        </StyledText>
    )
}

export const NightText = () => {
    const text = `
        Yep, it's dark. That's the thing. Don't expect to find much more on this website.
        I mean, it is called "very dark mode", what more did you expect?
        Okay, here is a fun fact: The common placeholder "Lorem ipsum" text, even though it is in Latin, actually doesn't have any interpretable meaning.
        Oh, and make sure you try and click somewhere.
    `
    return <StyledText style={{ whiteSpace: 'pre-line' }}>{text}</StyledText>
}
