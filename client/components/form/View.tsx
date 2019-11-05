import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';

import { Association } from "../field/Association";
import { Text } from "../field/Text";

import { Form } from "../../models/Form";
import { Field } from "../../models/Field";

import { FormContext } from "./Context";

export interface FormViewProps {
  id: string;
}

const componentMap : { [key: string]: React.ComponentType } = {
  Text,
  Association,
}

@observer
export class FormView extends React.Component<FormViewProps, { companyName: string, field?: Field }> {
  private form: IPromiseBasedObservable<Form>;
  private field: Field;

  constructor(props: FormViewProps) {
    super(props);
    this.state = {
      field: null,
      companyName: "",
    }
    this.form = fromPromise(Form.find(this.props.id));
  }

  componentDidUpdate(prevProps: FormViewProps) {
    if (this.props.id !== prevProps.id) {
      this.form = fromPromise(Form.find(this.props.id));
    }
  }

  edit = (field: Field) => {
    this.setState({ field });
  }

  endEdit = () => {
    this.setState({ field: null });
  }

  doEdit = (event: React.ChangeEvent<{ value: string }>) => {
    this.setState({ companyName: event.target.value });
  }

  submitEdit = () => {
    this.state.field.store.create({ name: this.state.companyName });
  }

  renderFieldComponent = (field: Field, i: number) => {
    const componentProps = {
      formView: this,
      field: field,
      key: i,
      id: "standard-name",
      label: field.column_name,
      name: field.column_name,
      data_source: field.data_source,
    }
    return React.createElement(componentMap[field.type], componentProps);
  }

  renderItem = (record: any) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <IconButton aria-label="delete" color="primary">
            <Edit />
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={record.name}
          secondary={record.id}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" color="secondary">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  renderEdit() {
    const { records } = this.state.field.store;
    return (
      <Grid item xs={6}>
        <FormControl variant="standard" fullWidth>
          <Box display="flex" mt="210px">
            <Box>
              <IconButton aria-label="delete" color="primary">
                <Search />
              </IconButton>
            </Box>
            <Box flexGrow={1}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Company"
                type="text"
                fullWidth
                onChange={this.doEdit}
              />
            </Box>
            <Box>
              <Button onClick={this.submitEdit} variant="outlined" size="large" color="primary">
                Save
              </Button>
            </Box>
            <Box>
              <IconButton onClick={this.endEdit} aria-label="delete" color="primary">
                <Close />
              </IconButton>
            </Box>
          </Box>
        </FormControl>
        <List dense={false}>
          {records.map(this.renderItem)}
        </List>
      </Grid>
    )
  }

  render() {
    if (!this.form.value) return "Loading";
    const { name, table_name, fields } = this.form.value;
    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            {name} ({table_name})
          </Typography>
          {fields.map(this.renderFieldComponent)}
        </Grid>
        {this.state.field && this.renderEdit()}
      </Grid>
    )
  }
}
