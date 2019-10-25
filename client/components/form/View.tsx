import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

import TextField from '@material-ui/core/TextField';

import { Form } from "../../models/Form";
import { Field } from "../../models/Field";

export interface FormViewProps {
  id: string;
}

@observer
export class FormView extends React.Component<FormViewProps, {}> {
  private form: IPromiseBasedObservable<Form>;

  constructor(props: FormViewProps) {
    super(props);
    this.form = fromPromise(Form.find(this.props.id));
  }

  componentDidUpdate(prevProps: FormViewProps) {
    if (this.props.id !== prevProps.id) {
      this.form = fromPromise(Form.find(this.props.id));
    }
  }

  render() {
    if (!this.form.value) return "Loading";
    const { name, table_name, fields } = this.form.value;
    return (
      <nav className="panel">
        <p className="panel-heading">
          {name} ({table_name})
        </p>
        {fields.map((field: Field, index: number) => {
          return <div className="field" key={index}>
            {field.input_type == "date" ? (
              <select className="select" name={field.name}>
                <option>Choose One</option>
              </select>
            ) : (
              <TextField
                id="standard-name"
                label={field.column_name}
                margin="normal"
              />
            )}
          </div>
        })}
      </nav>
    )
  }
}
