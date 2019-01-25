import React from "react";
import ReactTable from "react-table";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Tables extends React.Component {
  state = {
    restaurants: [],
    page: 0,
    cTotal: 0,
    cEmails: 0,
    cPrague: 0,
    cBrno: 0,
  };

  loadData() {
    this.getData({query: {}, limit: 50, skip: 50*this.state.page })
      .then(res => this.setState({
        restaurants: [...this.state.restaurants, ...res.result]
      }))
      .catch(err => console.log(err));
    this.getCount({})
      .then(res => this.setState({ cTotal: res.result }))
      .catch(err => console.log(err));
    this.getCount({ email: { $exists: true, $ne: null } })
      .then(res => this.setState({ cEmails: res.result }))
      .catch(err => console.log(err));

    this.getCount({ ranking_geo: 'Prague' })
      .then(res => this.setState({ cPrague: res.result }))
      .catch(err => console.log(err));
    this.getCount({ ranking_geo: 'Brno' })
      .then(res => this.setState({ cBrno: res.result }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.loadData();
    // setInterval(() => this.loadData(), 5000);
  }
  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
    this.loadData();
  }
  getCount = async (query) => {
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
  getData = async (props) => {
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
  render() {
    const s = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    <i className="text-muted">{s.cTotal}×</i>{' '}Restaurants{' '}
                    <i className="text-muted">{s.cPrague}×</i>{' '}Prague{' '}
                    <i className="text-muted">{s.cBrno}×</i>{' '}Brno{' '}
                    <i className="text-muted">{s.cEmails}×</i>{' '}Emails{' '}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Reviews Count</th>
                        <th>Rating</th>
                        <th>Price Level</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.restaurants.map((restaurant) =>
                        <tr>
                          <td>{restaurant.name}</td>
                          <td>{restaurant.ranking_geo}</td>
                          <td>{restaurant.num_reviews}</td>
                          <td>{restaurant.rating}</td>
                          <td>{restaurant.price_level}</td>
                          <td>{restaurant.email}</td>
                          <td>{restaurant.phone}</td>
                          <td>
                            <a href={restaurant.website} target="_blank">
                              <Button
                                id="tooltip636901683"
                                type="button"
                              >
                                <i className="tim-icons icon-link-72" />
                              </Button>

                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip636901683"
                                placement="right"
                              >
                                Website
                              </UncontrolledTooltip>
                            </a>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  <button onClick={this.loadMore} className="btn btn-info">
                    Load more
                  </button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Tables;
