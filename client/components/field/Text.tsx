import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

import * as Models from '../../models';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';

export interface TextProps {
  name: string;
  value: string;
}

@observer
export class Text extends React.Component<TextProps, { value: string }> {
  public static defaultProps = { value: "" };

  private value: string;

  constructor(props: TextProps) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  handleChange(event: React.ChangeEvent<{ value: string }>) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Box display="flex" p={1} bgcolor="background.paper">
        <Box p={1} flexGrow={1}>
          <TextField
            id="filled-full-width"
            label={this.props.name}
            placeholder=""
            fullWidth
            onChange={this.handleChange.bind(this)}
            margin="none"
            value={this.state.value}
            />
        </Box>
        <Box p={1}>
          <Button variant="outlined" size="large" color="primary">
            Edit
          </Button>
        </Box>
      </Box>
    )
  }
}
