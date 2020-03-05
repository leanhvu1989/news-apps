import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Headline from './Headline';
import Details from './Details';
import Setting from './Setting';
import Profile from './Profile';
import { UserProvider, UserConsumer } from '../services/userContext';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));



function Layout(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    //active selected tab
    let queryValue = 0;
    if (window.location.pathname.match(/(^\/?settings)/gi) !== null) {
      queryValue = 1;
    } else if (window.location.pathname.match(/(^\/?profile)/gi) !== null) {
      queryValue = 2;
    }
    setValue(queryValue);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <UserProvider>
        <CssBaseline />
        <Router>
          <ElevationScroll {...props}>
            <AppBar>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                aria-label="tabs bar"
              >
                <Tab to="/" component={Link} label="Headline" icon={<ViewHeadlineIcon />} />
                <Tab to="/settings" component={Link} label="Settings" icon={<SettingsIcon />} />
                {/* <Tab to="/profile" component={Link} label="Profile" icon={<PersonPinIcon />} /> */}
              </Tabs>
            </AppBar>
          </ElevationScroll>
          <Toolbar display="none" />
          <div>
            <UserConsumer>
              {({ user, settings, ...context }) => (
                <Switch>
                  <Route exact path="/">
                    <Headline settings={settings} {...context} />
                  </Route>
                  <Route path='/detail' component={Details}></Route>
                  <Route path="/settings">
                    <Setting user={user} settings={settings} {...context} />
                  </Route>
                  {/* <Route path="/profile" >
                    <Profile user={user} settings={settings} {...context} />
                  </Route> */}
                </Switch>
              )}
            </UserConsumer>
          </div>
        </Router>
      </UserProvider>
    </div>
  );
}

export default Layout;