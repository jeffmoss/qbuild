import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

import { Field } from '../../models/Field';

import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";

import { FormView } from '../form/View';

export interface AssociationProps {
  name: string;
  data_source: string;
  value: number;
  formView: FormView;
  field: Field;
}

export interface OptionInterface {
  id: number;
  name: string;
}

@observer
export class Association extends React.Component<AssociationProps, { value: number }> {
  public static defaultProps = { value: "" };

  private field: Field;
  private value: number;

  constructor(props: AssociationProps) {
    super(props);
    this.state = {
      value: this.props.value,
    };
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
    const { records } = this.props.field.store;
    return (
      <Box display="flex" p={1} bgcolor="background.paper">
        <Box p={1} flexGrow={1}>
          <FormControl variant="standard" fullWidth>
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
          <Button variant="outlined" size="large" color="primary" onClick={(e) => this.props.formView.edit(this.props.field)}>
            Edit
          </Button>
        </Box>
      </Box>
    )
  }
}
