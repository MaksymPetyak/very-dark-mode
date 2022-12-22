import React, { useState } from 'react'
import 'react-toggle/style.css'
import styled from 'styled-components'
import { VeryDarkMode } from './components/VeryDarkMode/VeryDarkMode'
import { Footer } from './components/Footer'
import { DayText, NightText } from './components/Texts'
import { DarkModeButton } from './components/DarkModeButton'
import { LightModeButton } from './components/LighModeButton'

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1100px;
    margin: auto;
    text-align: center;
    gap: 2rem;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
`

function App() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    return (
        <Container>
            <Content>
                <h2>
                    A <i>very</i> dark mode...
                </h2>
                <VeryDarkMode isDarkModeOn={isDarkMode} />
                {!isDarkMode && (
                    <DarkModeButton onClick={() => setIsDarkMode(true)} />
                )}
                {isDarkMode ? <NightText /> : <DayText />}
                {isDarkMode && (
                    <LightModeButton onClick={() => setIsDarkMode(false)} />
                )}
            </Content>
            <Footer />
        </Container>
    )
}

export default App
