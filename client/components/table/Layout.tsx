import * as React from 'react';
import { Link, Route, Switch, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";

import { TopMenu } from "../TopMenu";
import { TableView } from './View';

import { Table, TableStore } from "../../models/Table";

export interface TableLayoutProps { }

interface ViewMatchParams {
    name: string;
}

interface ViewMatchProps extends RouteComponentProps<ViewMatchParams> {
}

@observer
export class TableLayout extends React.Component<TableLayoutProps, {}> {
  private tableStore: TableStore;

  constructor(props: TableLayoutProps) {
    super(props);
    this.tableStore = new TableStore();
  }

  render() {
    const names = this.tableStore.records.map((table) => table.name);
    return (
      <div className="container">
        <TopMenu />

        <div className="columns">
          <div className="column is-one-fifth">
            <aside className="menu">
              <p className="menu-label">
                <span className="icon"><i className="fas fa-table" aria-hidden="true"></i></span>
                Tables
              </p>
              <ul className="menu-list">
                {names.map((table, index) => {
                  return <li key={index}>
                    <Link to={`/build/tables/${table.name}`}>
                      {table.name}
                    </Link>
                  </li>
                })}
              </ul>
            </aside>
          </div>
          <div className="column">
            <Switch>
              <Route path="/build/tables/:name"
                     render={( {match}: ViewMatchProps) => (<TableView table={match.params.name} />)} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
