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
import { Bar } from "react-chartjs-2";
import ISO6391 from 'iso-639-1';

let makeChartData = ({labels, data}) => {
  return {
    data: canvas => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

      return {
        labels,
        datasets: [
          {
            label: "Reviews",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data
          }
        ]
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              //suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
              autoSkip: false
            }
          }
        ]
      }
    }
  };
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
    accessor: "num_reviews"
  },
  {
    Header: "Target",
    accessor: "targetLang",
    filterable: false
  },
  {
    Header: "T.Rel.",
    Cell: props => props.value ? (props.value*100).toFixed(2)+'%' : 0,
    accessor: "targetLangRel",
    filterable: false
  },
  {
    Header: "E.Asia",
    Cell: props => props.value ? (props.value*100).toFixed(2)+'%' : 0,
    accessor: "langGroups.eastAsia.countRel",
    filterable: false
  },
  {
    Header: "Jap",
    accessor: "langDist.ja.count",
    filterable: false
  },
  {
    Header: "Ko",
    accessor: "langDist.ko.count",
    filterable: false
  },
  {
    Header: "CN",
    accessor: "langDist.zhCN.count",
    filterable: false
  },
  {
    Header: "TW",
    accessor: "langDist.zhTW.count",
    filterable: false
  },
  {
    Header: "RU",
    accessor: "langDist.ru.count",
    filterable: false
  },
  {
    Header: "IT",
    accessor: "langDist.it.count",
    filterable: false
  },
  {
    Header: "ES",
    accessor: "langDist.es.count",
    filterable: false
  },
  {
    Header: "FR",
    accessor: "langDist.fr.count",
    filterable: false
  },
  {
    Header: "TR",
    accessor: "langDist.tr.count",
    filterable: false
  },
  {
    Header: "Rating",
    accessor: "rating",
    filterable: false
  },
//  {
//    Header: "Price Level",
//    accessor: "price_level"
//  },
//  {
//    Header: "Email",
//    accessor: "email"
//  },
//  {
//    Header: "Phone",
//    accessor: "phone"
//  }
];

const functionsEndpoint = 'https://europe-west1-dinify.cloudfunctions.net';

const getData = async (props) => {
  const response = await fetch(`${functionsEndpoint}/dbFind`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props)
  });
  const body = await response.json();
  return body;
}
const getAggregation = async (props) => {
  const response = await fetch(`${functionsEndpoint}/dbAggregate`, {
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
  const response = await fetch(`${functionsEndpoint}/dbCount`, {
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
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let query = {};
    filtered.forEach((f) => {
      if (f.id === 'num_reviews') query[f.id] = {$gt: Number(f.value)};
      else query[f.id] = f.value;
    });
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
            if (['num_reviews'].includes(nextFilter.id)) return filteredSoFar; // ignore
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
      cBrno: 0,
      chart1title: null,
      chart1labels: [],
      chart1values: [],
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
  loadAgg(location_id) {
    const matchObj = {
      lang: {$ne: 'en'}
    };
    if (location_id) matchObj['location_id'] = location_id;
    getAggregation({query: [
      { $match: matchObj},
      { "$unwind": "$lang" },
      { "$group": {
          "_id": "$lang",
          "count": { "$sum": 1 }
      }},
      { $sort : { count : -1 } }
    ]}).then(res => {
      const arr = res.result;
      this.setState({chart1values: _.map(arr, 'count')})
      let labels = _.map(arr, '_id');
      labels = _.map(labels, (l) => {
        if (l.length > 2) {
          const lang = (_.take(l,2)+'').split(",").join("");
          const loc = (_.takeRight(l,2)+'').split(",").join("");
          return ISO6391.getName(lang)+' '+loc;
        }
        return ISO6391.getName(l) !== '' ? ISO6391.getName(l) : l
      });
      this.setState({chart1labels: labels})
    }).catch(err => console.log(err));
  }
  loadData(page = 0) {
    this.loadAgg();
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

  makeTableData = (data, useFields) => {
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
              onClick={() => {
                this.loadAgg(prop.location_id)
                this.setState({chart1title: prop.name})
              }}
              className={classNames("btn-icon btn-link like", {
                "btn-neutral": key === -12
              })}
            >
              <i className="tim-icons icon-chart-bar-32" />
            </Button>{" "}
          </div>
        )
      };
      const row = _.assign(obj, values);
      return row;
    })
  }

  render() {
    const { data, pages, loading, chart1title } = this.state;
    console.log(this.state.chart1labels,  this.state.chart1values);
    const chartData = makeChartData({ labels: this.state.chart1labels, data: this.state.chart1values})
    return (
      <>
        <div className="content">
          <Row>
            <Col className="ml-auto mr-auto" lg="12">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Languages distribution</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-world text-info" />{" "}
                    {_.sum(this.state.chart1values)} Non-English Reviews {chart1title && `in ${chart1title}`}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area" style={{height: '400px'}}>
                    <Bar
                      data={chartData.data}
                      options={chartData.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
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
                    data={this.makeTableData(data, useFields)}
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
