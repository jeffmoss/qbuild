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
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
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
    <div className={classes.root}>
      <TopMenu />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/build/forms/:id"
                 render={( {match}: FormViewMatchProps) => (<FormView id={match.params.id} />)} />
        </Switch>
      </main>
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
    </div>
  )
})
