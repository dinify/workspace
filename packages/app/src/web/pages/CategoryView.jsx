import React from 'react';
import AppBar from 'web/components/AppBar';
import ResponsiveContainer from 'tabb-front/dist/components/ResponsiveContainer';
import { connect } from 'react-redux';
import { fetchMenuitemsInit } from 'ducks/menuItem/actions';
import { getItemsOfCategory } from 'ducks/menuItem/selectors';

class CategoryView extends React.PureComponent {
  componentWillMount() {
    const {
      fetchMenuitems,
      match: { params }
    } = this.props;
    fetchMenuitems({ categoryId: params.id });
  }
  render() {
    const {
      menuItemsList
    } = this.props;

    return (
      <div>
        <AppBar position="static" />
        <ResponsiveContainer>
          {menuItemsList.map((item) =>
            <div key={item.id}>
              {item.name}
            </div>
          )}
        </ResponsiveContainer>
      </div>
    );
  }
}

export default connect(
  (state, { match }) => ({
    category: state.menuCategory.all[match.params.id],
    menuItemsList: getItemsOfCategory(state, match.params.id)
  }),
  {
    fetchMenuitems: fetchMenuitemsInit,
  }
)(CategoryView)
