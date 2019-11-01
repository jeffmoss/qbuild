import * as React from 'react';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export interface TopMenuProps { }

export class TopMenu extends React.Component<TopMenuProps, {}> {
  constructor(props: TopMenuProps) {
    super(props);
  }

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start">
            <MenuIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/build/tables">Tables</Button>
          <Button color="inherit" component={Link} to="/build/forms">Forms</Button>
        </Toolbar>
      </AppBar>
    );
  }
}
