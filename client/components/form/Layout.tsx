import * as React from 'react';
import { Link, Route, Switch, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import { TopMenu } from "../TopMenu";
import { FormView, FormViewProps } from './View';

import { Form, FormStore } from "../../models/Form";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface FormViewMatchProps extends RouteComponentProps<FormViewProps> { }

export interface FormLayoutProps { }

export const FormLayout: React.SFC<FormLayoutProps> = observer((props) => {
  const [formStore, setFormStore] = React.useState(new FormStore());

  const classes = useStyles(props);

  return (
    <div>
      <TopMenu />
      <nav className={classes.drawer} aria-label="forms">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          anchor="right"
        >
          <List>
          {formStore.records.map((form, index) => (
            <ListItem key={index} component={Link} to={`/build/forms/${form.id}`}>
              <ListItemIcon><MenuIcon /></ListItemIcon>
              <ListItemText primary={form.table_name} />
            </ListItem>
          ))}
          </List>
        </Drawer>
      </nav>

      <main className={classes.content}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Switch>
          <Route path="/build/forms/:id"
                 render={( {match}: FormViewMatchProps) => (<FormView id={match.params.id} />)} />
        </Switch>
      </main>
    </div>
  )
})
