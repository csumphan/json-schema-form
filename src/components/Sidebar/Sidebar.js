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

class AdminSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
  render() {
    console.log('sss', this.props.schema)
    return (
      <Sidebar
        sidebarClassName='sidebar'
        contentClassName='main'
        sidebar={<SidebarContent pages={this.props.schema}/>}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        {this.props.children}
      </Sidebar>
  )
  }
}

export default AdminSidebar
