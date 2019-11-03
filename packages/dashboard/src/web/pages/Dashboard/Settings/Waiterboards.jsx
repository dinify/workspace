import React, { useEffect } from 'react';
import { compose } from 'redux';
import pluck from 'ramda/es/pluck';
import sum from 'ramda/es/sum';
import apply from 'ramda/es/apply';
import last from 'ramda/es/last';
import range from 'ramda/es/range';

import { withStyles } from '@material-ui/core/styles';
import { MapToList } from '@dinify/common/src/lib/FN';
import { connect } from 'react-redux';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import 'react-switch-button/dist/react-switch-button.css';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import { Field, reduxForm } from 'redux-form';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import Group from '@material-ui/icons/Group';
import DragHandle from '@material-ui/icons/DragHandle';
import Delete from '@material-ui/icons/Delete';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import Loading from 'web/components/Loading';

import {
  createWaiterboardInitAction,
  deleteWaiterboardInitAction,
  createTableInitAction,
  deleteTableInitAction,
  updateTableInitAction,
  fetchWaiterboards
} from 'ducks/restaurant/actions';

import styles from './WaiterboardsStyles';


// let CreateWaiterboardForm = ({ handleSubmit }) => {
//   return (
//     <form onSubmit={handleSubmit} className="center">
//       <Field
//         name="name"
//         component={Text}
//         componentProps={{
//           placeholder: 'Waiterboard Name',
//           fullWidth: true,
//         }}
//       />
//       <Button type="submit" fullWidth>
//         Create
//       </Button>
//     </form>
//   );
// };
// CreateWaiterboardForm = reduxForm({
//   form: 'waiterboards/createWaiterboard',
//   enableReinitialize: true,
// })(CreateWaiterboardForm);

let CreateTableForm = ({ handleSubmit, t, classes }) => {
  const style = { height: '64px' };
  const inputStyle = { textAlign: 'center' };
  return (
    <form onSubmit={handleSubmit} className="center">
      <div className={classes.fieldsContainer}>
        <Field
          name="number"
          component={Text}
          componentProps={{
            label: t('tableNumber'),
            type: 'number',
            min: 1,
            max: 1000,
            fullWidth: true,
            style,
            inputProps: {style: inputStyle}
          }}
        />
      </div>
      <div className={classes.fieldsContainer}>
        <Field
          name="capacity"
          component={Text}
          componentProps={{
            label: t('tableCapacity'),
            type: 'number',
            min: 1,
            max: 50,
            fullWidth: true,
            style,
            inputProps: {style: inputStyle}
          }}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button type="submit" variant="outlined" style={{ color: 'white' }}>
          {t('addTable')}
        </Button>
      </div>
    </form>
  );
};
CreateTableForm = compose(
  connect((state, props) => ({
    form: `waiterboards/${props.waiterboardId}/createTable`,
  })),
  reduxForm({
    enableReinitialize: true,
  }),
)(CreateTableForm);

const cardSource = {
  beginDrag(props) {
    return {
      table: props.table,
      wb: props.wb,
    };
  },
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}
let TableComponent = ({
  table,
  wb,
  deleteTable,
  fixedWidth,
  // isDragging,
  connectDragSource,
  connectDragPreview,
  classes
}) => {
  return connectDragPreview(
    <div>
      <div className={classes.tableBox} fixedWidth={fixedWidth}>
        {connectDragSource(
          <div style={{ height: '50px' }}>
            <div className={classes.thumbnail}>
              <div className={classes.id}>{table.number}</div>
              <DragHandle />
            </div>
          </div>,
        )}
        <div className={classes.seats}>
          <Tooltip placement="top" title="Capacity">
            <div className={classes.capacity}>
              <span>{table.capacity}</span>
              <Group />
            </div>
          </Tooltip>
          <Tooltip placement="left" title="Delete Table">
            <button
              className="deleteButton"
              onClick={() =>
                deleteTable({ id: table.id, waiterboardId: wb.id })
              }
            >
              <Delete />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>,
  );
};
TableComponent.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
};
TableComponent = DragSource('table', cardSource, collect)(TableComponent);

const boxTarget = {
  drop(targetProps, monitor) {
    const { updateTable, x, y } = targetProps;
    const { id } = monitor.getItem().table;
    const waiterboardId = monitor.getItem().wb.id;
    updateTable({ id, x, y, waiterboardId });
  },
};
let TargetComponent = ({ isOver, connectDropTarget, classes }) => {
  return connectDropTarget(
    <div>
      <div
        className={classes.tablePlaceholder}
        style={{
          background: isOver ? 'black' : 'rgba(0,0,0,0.1)'
        }}
      />
    </div>,
  );
};
TargetComponent = DropTarget('table', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(TargetComponent);

const Waiterboards = ({
  // createWaiterboard,
  // deleteWaiterboard,
  createTable,
  deleteTable,
  updateTable,
  classes,
  fetchWaiterboards,
  waiterboards,
}) => {
  const { t } = useTranslation();

  const shouldLoad = waiterboards.length < 1 ;
  useEffect(() => {
    fetchWaiterboards();
  }, []);
  if (shouldLoad) return <Loading />;

  const wbs = waiterboards.map(wb => {
    const tables = MapToList(wb.tables).sort(
      (a, b) => a.number - b.number,
    );
    const xs = pluck('x')(tables); // columns
    const ys = pluck('y')(tables); // rows
    const tableNumbers = pluck('number')(tables); // numbers
    const capacities = pluck('capacity')(tables); // numbers
    wb.capacity = sum(capacities);
    wb.maxX = apply(Math.max, xs);
    wb.maxY = apply(Math.max, ys);
    if (tables.length > 0 && tables.length < 5) {
      wb.maxX = 4;
    }
    wb.lastTableCapacity = last(capacities) || 4;
    if (tableNumbers.length < 1) wb.maxTableNumber = 0;
    else wb.maxTableNumber = apply(Math.max, tableNumbers);
    wb.tables = tables;
    const tablesMatrix = range(0, wb.maxY + 1).map(() =>
      range(0, wb.maxX + 1).map(() => null),
    ); // tablesMatrix[y][x]
    tables.forEach(table => {
      if (Number.isInteger(table.x) && Number.isInteger(table.y))
        tablesMatrix[table.y][table.x] = table;
    });

    wb.suitableY = wb.maxY;
    const lastRow = last(tablesMatrix);
    if (!lastRow) {
      wb.suitableX = 0;
      wb.suitableY = 0;
    } else if (last(lastRow)) {
      // if last column of last row is full
      wb.suitableY += 1;
      wb.maxY += 1;
      //tablesMatrix[wb.maxY] = range(0, wb.maxX+1).map(() => null) // add row
      wb.suitableX = 0; // new table will be the first of new row
    } else {
      for (let i = lastRow.length - 1; i >= 0; i--) {
        if (lastRow[i]) {
          wb.suitableX = i + 1;
          break;
        }
      }
    }
    return { ...wb, tablesMatrix };
  });

  return (
    <div>
      <div className={classes.contentWrapper}>
      {wbs.map(wb => (
        <div className={classes.wb} key={wb.id}>
          <div className={classes.wbHeader}>
            <a
              href={`https://waiterboard.dinify.app/board/${wb.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={classes.wbTitle}>
                <div className="label">WAITERBOARD</div>
                <div>
                  <span>{t('goToWaiterboard')}</span>
                  <OpenInBrowser />
                </div>
              </div>
            </a>
            <Tooltip placement="top" title="Total Capacity">
              <div className={classes.wbInfo}>
                {wb.capacity}
                <Group />
              </div>
            </Tooltip>
            {/*
            <Tooltip placement="top" title="Delete Waiterboard">
              <DeleteWaiterboard
                onClick={() => deleteWaiterboard({ id: wb.id })}
              >
                <Delete />
              </DeleteWaiterboard>
            </Tooltip>            
            */}

          </div>
          <div className={classes.wbBody}>
            <table className={classes.tableTag}>
              <tbody>
                {wb.tablesMatrix.map((row, i) => (
                  <tr key={i}>
                    {row.map(
                      (table, j) =>
                        table ? (
                          <td key={table.id}>
                            <TableComponent
                              classes={classes}
                              table={table}
                              wb={wb}
                              deleteTable={deleteTable}
                            />
                          </td>
                        ) : (
                          <td key={(i + 1) * (j + 1)}>
                            <TargetComponent
                              classes={classes}
                              x={j}
                              y={i}
                              updateTable={updateTable}
                            />
                          </td>
                        ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <CreateTableForm
              classes={classes}
              t={t}
              waiterboardId={wb.id}
              initialValues={{
                number: wb.maxTableNumber + 1,
                capacity: wb.lastTableCapacity,
              }}
              onSubmit={({ capacity, number }) =>
                createTable({
                  capacity,
                  number,
                  waiterboardId: wb.id,
                  x: wb.suitableX,
                  y: wb.suitableY,
                })
              }
            />
          </div>
        </div>
      ))}
      {/*
      <FormBox fullWidth>
        <FormBoxHead>
          <span>Create Waiterboard</span>
          <Progress type={'CREATE_WAITERBOARD'} />
        </FormBoxHead>
        <FormBoxBody material>
          <CreateWaiterboardForm onSubmit={createWaiterboard} />
        </FormBoxBody>
      </FormBox>        
      */}

      </div>
    </div>
  );
}

export default compose(
  withStyles(styles),
  connect(
    state => ({
      waiterboards: MapToList(state.restaurant.waiterboards),
      waiterboardsLoaded: state.restaurant.waiterboardsLoaded
    }),
    {
      createWaiterboard: createWaiterboardInitAction,
      deleteWaiterboard: deleteWaiterboardInitAction,
      createTable: createTableInitAction,
      deleteTable: deleteTableInitAction,
      updateTable: updateTableInitAction,
      fetchWaiterboards
    },
  )
)(Waiterboards);
