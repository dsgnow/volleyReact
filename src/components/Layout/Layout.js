import styled from 'styled-components'

function Layout(props) {
  const Wrapper = styled.div`
    max-width: 1920px;
    margin: 0 auto;
  `

  return (
    <Wrapper>
      {props.header}
      {/* <div className="container">{props.menu}</div> */}
      {props.content}
      {/* <div>{props.footer}</div> */}
    </Wrapper>
  )
}

export default Layout
