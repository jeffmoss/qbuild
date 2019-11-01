import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

import * as Models from '../../models';

import Box from '@material-ui/core/Box';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface AssociationProps {
  name: string;
  data_source: string;
  value: number;
}

export interface OptionInterface {
  id: number;
  name: string;
}

// TODO: This ought to be coming from an "App" model, app-specific stores only.
const storeMap : { [key: string]: any } = {
  "CompanyStore": Models.CompanyStore,
}

@observer
export class Association extends React.Component<AssociationProps, { value: number, companyName: string, editing: boolean }> {
  public static defaultProps = { value: "" };

  private store: Models.AppStore;
  private value: number;

  constructor(props: AssociationProps) {
    super(props);
    this.state = {
      value: this.props.value,
      editing: false,
      companyName: "",
    };
    this.store = new storeMap[props.data_source]();
  }

  selectOption(record: OptionInterface, i: number) {
    return (
      <MenuItem key={i} value={record.id}>{record.name}</MenuItem>
    );
  }

  handleChange(event: React.ChangeEvent<{ value: number }>) {
    this.setState({ value: event.target.value });
  }

  editOpen = () => {
    this.setState({ editing: true });
  }

  editClose = () => {
    this.setState({ editing: false });
  }

  doEdit = (event: React.ChangeEvent<{ value: string }>) => {
    this.setState({ companyName: event.target.value });
  }

  editSubmit = () => {
    this.store.create({ name: this.state.companyName });
  }

  render() {
    const { records } = this.store;
    return (
      <Box display="flex" p={1} bgcolor="background.paper">
        <Box p={1} flexGrow={1}>
          <FormControl variant="standard" fullWidth={true}>
            <InputLabel htmlFor="filled-age-simple">{this.props.name}</InputLabel>
            <Select
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              autoWidth={true}
              inputProps={{
                name: this.props.name,
                id: this.props.name,
              }}>
              <option value="" />
              {records.map(this.selectOption)}
            </Select>
          </FormControl>
        </Box>
        <Box p={1}>
          <Button variant="outlined" size="large" color="primary" onClick={this.editOpen}>
            Edit
          </Button>
          <Dialog open={this.state.editing} onClose={this.editClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Option</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add a new record to the dropdown.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Company"
                type="text"
                fullWidth
                onChange={this.doEdit}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.editClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.editSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    )
  }
}
