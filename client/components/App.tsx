import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { FormLayout } from './form/Layout';
import { TableLayout } from './table/Layout';

export interface AppProps { instance: string; }

export class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => (
          <Redirect to="/build/tables/"/>
        )}/>
        <Route path="/build/tables" component={TableLayout} />
        <Route path="/build/forms" component={FormLayout} />
      </Router>
    )
  }
}
