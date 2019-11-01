import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

import Typography from '@material-ui/core/Typography';

import { Association } from "../field/Association";
import { Text } from "../field/Text";

import { Form } from "../../models/Form";
import { Field } from "../../models/Field";

export interface FormViewProps {
  id: string;
}

const componentMap : { [key: string]: React.ComponentType } = {
  Text,
  Association,
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

  renderFieldComponent(field: Field, i: number) {
    const componentProps = {
      key: i,
      id: "standard-name",
      label: field.column_name,
      name: field.column_name,
      data_source: field.data_source,
    }
    return React.createElement(componentMap[field.type], componentProps);
  }

  render() {
    if (!this.form.value) return "Loading";
    const { name, table_name, fields } = this.form.value;
    return (
      <nav className="panel">
        <Typography variant="h5" gutterBottom>
          {name} ({table_name})
        </Typography>
        {fields.map(this.renderFieldComponent)}
      </nav>
    )
  }
}
