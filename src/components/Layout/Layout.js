function Layout(props) {
  return (
    <>
      {props.header}
      {/* <div className="container">{props.menu}</div> */}
      {props.content}
      {/* <div>{props.footer}</div> */}
    </>
  )
}

export default Layout
