import React, { Component } from 'react'
import Sidebar from 'react-sidebar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './Sidebar.css'

const mql = window.matchMedia(`(min-width: 800px)`);

const SidebarContent = ({ pages }) => (
  <div>
    {Object.keys(pages).map((key) => (
      <Link to={`/${key.toLowerCase()}`}>
        <p className='sidebar-link'>
          {pages[key].label}
        </p>
      </Link>
    ))}
  </div>
)

// refer to the react-sidebar docs if any change is needed
// https://github.com/balloob/react-sidebar
class AdminSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  toggleOpen = (ev) => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })

    if (ev) {
      ev.preventDefault()
    }
  }

  render() {

    return (
      <Sidebar
        sidebarClassName='sidebar'
        contentClassName=''
        sidebar={<SidebarContent pages={this.props.schema}/>}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
      <div className='main-content'>
        {!this.state.sidebarDocked && (
        <div className='content-header-container'>
          <a
            onClick={this.toggleOpen}
            href="#"
            className='content-header-button'
          >
            =
          </a>
        </div>
      )}
        {this.props.children}
      </div>
      </Sidebar>
  )
  }
}

export default AdminSidebar
