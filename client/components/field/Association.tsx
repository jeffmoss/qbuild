import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

import * as Models from '../../models';

import Grid from '@material-ui/core/Grid';

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";

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
export class Association extends React.Component<AssociationProps, { value: number }> {
  public static defaultProps = { value: "" };

  private store: Models.AppStore;
  private value: number;

  constructor(props: AssociationProps) {
    super(props);
    this.state = {
      value: this.props.value,
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

  render() {
    const { records } = this.store;
    return (
      <Grid container spacing={3}>
        <Grid item xs>
          <FormControl variant="standard">
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
          <Button variant="outlined" size="large" color="primary">
            Edit
          </Button>
        </Grid>
      </Grid>
    )
  }
}
