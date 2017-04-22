import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import transitions from 'material-ui/styles/transitions';
import PlaylistIcon from 'material-ui/svg-icons/av/playlist-play';
import RadioIcon from 'material-ui/svg-icons/av/radio';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import InfoIcon from 'material-ui/svg-icons/action/info';
import Program from './routes/Program';
import Stations from './routes/Stations';
import Settings from './routes/Settings';
import About from './routes/About';


const styles = {
  content: {
    padding: 16,
    maxWidth: 800,
    transition: transitions.easeOut(null, 'padding-left', null),
  },
  menuLink: {
    textDecoration: 'none',
  },
};

const routes = [
  {
    link: '/',
    exact: true,
    title: 'Programm',
    component: Program,
    icon: <PlaylistIcon/>,
  },
  {
    link: '/stations',
    title: 'Sender',
    component: Stations,
    icon: <RadioIcon/>,
  },
  {
    link: '/settings',
    title: 'Einstellungen',
    component: Settings,
    icon: <SettingsIcon/>,
  },
  {
    link: '/about',
    title: 'Info',
    component: About,
    icon: <InfoIcon/>,
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: {
        open: false,
        docked: false,
      },
      station: {
        name: 'Radio FM4',
      },
    };
  }

  componentWillMount() {
    const mql = window.matchMedia('(min-width: 840px)');
    mql.addListener(() => {
      this.mqlChange(mql.matches);
    });
    this.mqlChange(mql.matches);
  }

  mqlChange(matches) {
    this.setState({
      drawer: {
        open: matches,
        docked: matches,
      },
    });
  }

  toggleDrawer() {
    this.setState({
      drawer: {
        ...this.state.drawer,
        open: !this.state.drawer.open,
      },
    });
  }

  closeDrawer() {
    if (!this.state.sidebarDocked) {
      this.setState({
        sidebarOpen: false,
      });
    }
  }

  render() {
    const paddingLeft = (this.state.drawer.docked ? 256 : 0) + 16;

    return <MuiThemeProvider>
      <Router>
        <div>
          <AppBar title={this.state.station.name}
                  onLeftIconButtonTouchTap={() => this.toggleDrawer()}
                  iconStyleLeft={{ display: this.state.drawer.docked ? 'none' : 'block' }}
                  style={{ paddingLeft }}/>
          <Drawer open={this.state.drawer.open}
                  docked={this.state.drawer.docked}
                  onRequestChange={() => this.toggleDrawer()}>
            {routes.map(route => (
              <Link to={route.link} key={route.link} style={styles.menuLink}>
                <MenuItem primaryText={route.title}
                          leftIcon={route.icon}
                          onTouchTap={() => this.closeDrawer()}/>
              </Link>
            ))}
          </Drawer>
          <div style={{ ...styles.content, paddingLeft }}>
            {routes.map(route => (
              <Route exact
                     key={route.link}
                     path={route.link}
                     component={route.component}/>
            ))}
          </div>
        </div>
      </Router>
    </MuiThemeProvider>;
  }
}
