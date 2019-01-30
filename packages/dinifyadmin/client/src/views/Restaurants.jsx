import React, { Component } from "react";
import classNames from "classnames";
import _ from 'lodash';
// react component for creating dynamic tables
import ReactTable from "react-table";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";

const makeTableData = (data, useFields) => {
  return data.map((prop, key) => {
    const values = _.pick(prop, _.map(useFields,'accessor'));
    const obj = {
      id: prop._id || key,
      actions: (
        // we've added some custom button actions
        <div className="actions-right">
          <a href={prop.website} target="_blank">
          <Button
            color="info"
            size="sm"
            className={classNames("btn-icon btn-link like", {
              "btn-neutral": key === -12
            })}
          >
            <i className="tim-icons icon-link-72" />
          </Button></a>{" "}
          {/* use this button to add a like kind of action */}
          <Button
            color="info"
            size="sm"
            className={classNames("btn-icon btn-link like", {
              "btn-neutral": key === -12
            })}
          >
            <i className="tim-icons icon-heart-2" />
          </Button>{" "}
          {/* use this button to add a edit kind of action */}
          <Button
            color="warning"
            size="sm"
            className={classNames("btn-icon btn-link like", {
              "btn-neutral": key === -12
            })}
          >
            <i className="tim-icons icon-pencil" />
          </Button>{" "}
        </div>
      )
    };
    const row = _.assign(obj, values);
    return row;
  })
}

const useFields = [
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "City",
    accessor: "ranking_geo"
  },
  {
    Header: "Reviews",
    accessor: "num_reviews",
    filterable: false
  },
  {
    Header: "Rating",
    accessor: "rating",
    filterable: false
  },
  {
    Header: "Price Level",
    accessor: "price_level"
  },
  {
    Header: "Email",
    accessor: "email"
  },
  {
    Header: "Phone",
    accessor: "phone"
  }
];

const getData = async (props) => {
  const response = await fetch('/api/db/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props)
  });
  const body = await response.json();
  return body;
}
const getCount = async (query) => {
  const response = await fetch('/api/db/count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query
    })
  });
  const body = await response.json();
  return body;
}
const requestData = (pageSize, page, sorted, filtered) => {
  console.log(sorted);
  console.log(filtered);
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let query = {};
    filtered.forEach((f) => query[f.id] = f.value);
    getCount(query)
    .then((cRes) => {
      const totalCount = cRes.result;
      let sort = {};
      sorted.forEach((s) => sort[s.id] = s.desc ? -1 : 1);
      getData({query, sort, limit: pageSize, skip: pageSize*page })
      .then((res) => {
        const rawData = res.result;
        let filteredData = rawData;

        // You can use the filters in your request, but you are responsible for applying them.
        if (filtered.length) {
          filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
            return filteredSoFar.filter(row => {
              return (row[nextFilter.id] + "").includes(nextFilter.value);
            });
          }, filteredData);
        }
        // You can also use the sorting in your request, but again, you are responsible for applying it.
        const sortedData = _.orderBy(
          filteredData,
          sorted.map(sort => {
            return row => {
              if (row[sort.id] === null || row[sort.id] === undefined) {
                return -Infinity;
              }
              return typeof row[sort.id] === "string"
                ? row[sort.id].toLowerCase()
                : row[sort.id];
            };
          }),
          sorted.map(d => (d.desc ? "desc" : "asc"))
        );

        // You must return an object containing the rows of the current page, and optionally the total pages number.
        resolve({
          rows: sortedData,
          pages: totalCount
        });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  });
};

class ReactTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: null,
      loading: true,
      cTotal: 0,
      cEmails: 0,
      cPrague: 0,
      cBrno: 0
    };
  }
  fetchData = (state, instance) => {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }
  loadData(page = 0) {
    getCount({})
      .then(res => this.setState({ cTotal: res.result }))
      .catch(err => console.log(err));
    getCount({ email: { $exists: true, $ne: null } })
      .then(res => this.setState({ cEmails: res.result }))
      .catch(err => console.log(err));

    getCount({ ranking_geo: 'Prague' })
      .then(res => this.setState({ cPrague: res.result }))
      .catch(err => console.log(err));
    getCount({ ranking_geo: 'Brno' })
      .then(res => this.setState({ cBrno: res.result }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { data, pages, loading } = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    <i className="text-muted">{this.state.cTotal}×</i>{' '}Restaurants{' '}
                    <i className="text-muted">{this.state.cPrague}×</i>{' '}Prague{' '}
                    <i className="text-muted">{this.state.cBrno}×</i>{' '}Brno{' '}
                    <i className="text-muted">{this.state.cEmails}×</i>{' '}Emails{' '}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    columns={[
                      ...useFields,
                      {
                        Header: "Actions",
                        accessor: "actions",
                        sortable: false,
                        filterable: false
                      }
                    ]}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={makeTableData(data, useFields)}
                    pages={pages} // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    filterable
                    resizable={true}
                    defaultPageSize={20}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ReactTables;
