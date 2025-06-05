import { FooterContainer } from "../styled-components/Footer"

const Footer = () => {
  return (
    <FooterContainer>
      <p> &copy; {new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(new Date()) } Created by <span>Mihreteab</span></p>
    </FooterContainer>
  )
}

export default Footer