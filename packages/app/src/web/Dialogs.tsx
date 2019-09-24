import React from 'react';
import { openDialog, closeDialog } from '../ducks/ui/actions';
import { connect } from 'react-redux';
import toPairs from 'ramda/es/toPairs';

const Dialogs = (props: {
  dialogs: {},
  closeDialog: (id: string) => void
}) => {
  const { dialogs, closeDialog } = props;
  return (<>
    {toPairs(dialogs).map((dPair: any) =>
      dPair[1].component({
        key: dPair[0],
        id: dPair[0],
        open: dPair[1].open,
        onClose: () => { closeDialog(dPair[0]) }
      })
    )}
  </>);
}

export default connect(
  (state: any) => ({
    dialogs: state.ui.dialogs,
  }),
  {
    openDialog,
    closeDialog,
  }
)(Dialogs);
