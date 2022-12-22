import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithub,
    faLinkedin,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 32px 16px;
`

const FooterLine = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
`

const StyledText = styled.p`
    font-size: 20px;
    margin: 0;
`

const StyledLink = styled.a`
    color: black;
    &:hover {
        color: #0066cc;
    }
`

export const Footer = () => {
    return (
        <FooterContainer>
            <FooterLine>
                <StyledText>Best experienced on desktop browser</StyledText>
            </FooterLine>
            <FooterLine>
                <StyledText>Code avaiable on GitHub</StyledText>
                <StyledLink href="https://github.com/MaksymPetyak/very-dark-mode">
                    <FontAwesomeIcon size={'lg'} icon={faGithub} />
                </StyledLink>
            </FooterLine>
            <FooterLine>
                <StyledText>Created by Maksym Petyak</StyledText>
                <StyledLink href="https://www.linkedin.com/in/maksym-petyak-2763ba157/">
                    <FontAwesomeIcon size={'lg'} icon={faLinkedin} />
                </StyledLink>
                <StyledLink href="https://twitter.com/PetyakMi">
                    <FontAwesomeIcon size={'lg'} icon={faTwitter} />
                </StyledLink>
            </FooterLine>
        </FooterContainer>
    )
}
