import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";

import { Column, ColumnStore } from "../../models/Column";

export interface TableViewProps {
  table: string;
}

@observer
export class TableView extends React.Component<TableViewProps, {}> {
  private columnStore: ColumnStore;

  constructor(props: TableViewProps) {
    super(props);
    this.columnStore = new ColumnStore(this.props.table);
  }

  componentDidUpdate(prevProps: TableViewProps) {
    if(this.props.table !== prevProps.table) {
      this.columnStore.load(this.props.table);
    }
  }

  render() {
    return (
      <nav className="panel">
        <p className="panel-heading">
          {this.props.table}
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <Link className="button" to={`/build/forms/new?table_name=${this.props.table}`}>New Form</Link>
          </p>
        </div>
        {this.columnStore.records.map((column, index) => {
          return <Link className="panel-block is-active"
                       to={`/build/tables/${this.props.table}/columns/${column.name}`}
                       key={index}>
            <span className="panel-icon">
              <i className="fas fa-circle" aria-hidden="true"></i>
            </span>
            {column.name}
          </Link>
        })}
        <label className="panel-block">
          <input type="checkbox" />
          remember me
        </label>
        <div className="panel-block">
          <button className="button is-link is-outlined is-fullwidth">
            New
          </button>
        </div>
      </nav>
    )
  }
}
