import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import styled from 'styled-components'

const MoonContainer = styled.button`
    padding: 12px 16px;
    background-color: black;
    border: 2px solid #1a1a1a;
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

export const DarkModeButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <MoonContainer onClick={onClick}>
            <FontAwesomeIcon icon={faMoon} size="2x" color={'#ffd132'} />
            <h3 style={{ color: 'white' }}>CLICK ME</h3>
        </MoonContainer>
    )
}
