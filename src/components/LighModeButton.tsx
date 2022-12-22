import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const MoonContainer = styled.button`
    padding: 12px 16px;
    background-color: lightyellow;
    border: 2px solid yellow;
    border-radius: 15px;
    display: flex;
    gap: 8px;
    align-items: center;
    border-radius: 16px;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
        transform: translateY(-2px);
    }
    &:active {
        box-shadow: none;
        transform: translateY(0);
    }
`

export const LightModeButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <MoonContainer onClick={onClick}>
            <FontAwesomeIcon icon={faSun} size="2x" color={'#ffd132'} />
            <h3 style={{ color: 'black' }}>BACK TO THE LIGHT</h3>
        </MoonContainer>
    )
}
