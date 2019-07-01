export default () => ({
  contentWrapper: {
    margin: '14px 10px'
  },
	wb: {
		background: 'rgb(60, 60, 65)',
		color: 'white',
		boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
		marginBottom: 10,
		borderRadius: 2,
		'& a': {
			color: 'white',
		},
		'&.button': {
			background: '#2c9df1',
			color: 'white',
			textAlign: 'center',
			textTransform: 'uppercase',
			cursor: 'pointer',
		},
		'& input, label': {
			color: 'white !important',
		},
		'& svg': {
			verticalAlign: 'text-top',
		}
	},
	wbHeader: {
		background: 'rgba(255, 255, 255, 0.1)',
		padding: '0 10px',
		position: 'relative',
		height: 50,		
	},
	wbInfo: {
		position: 'absolute',
		top: 0,
		right: 20,
		height: 50,
		lineHeight: '50px',
		fontSize: 24,
		color: 'rgba(255, 255, 255, 0.5)',
		'& i': {
			marginLeft: 7,
		}
	},
	wbTitle: {
		padding: 7,
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: 18,
		'& .linkIcon': {
			marginLeft: 5,
			color: 'rgba(255, 255, 255, 0.25)',
		},
		'& .label': {
			textTransform: 'uppercase',
			fontWeight: 300,
			fontSize: 10,
			letterSpacing: 1,
			color: 'rgba(255, 255, 255, 0.25)',
		},
		'&:hover': {
			color: 'white',
			'& .linkIcon': {
				color: 'rgba(255, 255, 255, 1)',
			}
		}
	},
	wbBody: {
		padding: 10
	},
	tableBox: {
		display: 'inline-block',
		background: 'rgba(0, 0, 0, 0.3)',
		color: 'white',
		fontSize: 12,
		width: '100%',
		margin: 0,
		overflow: 'hidden',
		position: 'relative',
		height: '100%',
		minHeight: 50,		
	},
	tablePlaceholder: {
		display: 'inline-block',
		overflow: 'hidden',
		position: 'relative',
		height: '100%',
		minHeight: 50,
		width: '100%',
	},
	thumbnail: {
		position: 'absolute',
		top: 0,
		left: 0,
		background: 'rgba(0, 0, 0, 0.2)',
		width: '20%',
		height: '100%',
		padding: '2px 0',
		textAlign: 'center',
		transition: 'all 150ms ease-in-out',
		cursor: 'move',
		'& i': {
			color: 'rgba(255, 255, 255, 0.3)',
			fontSize: 15,
			position: 'absolute',
			bottom: 5,
			left: 12,
		}		
	},
	id: {
		fontSize: 13,
		fontWeight: 700,
		width: '100%',
	},
	seats: {
		position: 'absolute',
		top: 0,
		left: '20%',
		width: '80%',
		padding: '2px 0 2px 5px',
		height: '100%',
		textAlign: 'left',
		'& .deleteButton': {
			position: 'absolute',
			top: 0,
			right: 0,
			cursor: 'pointer',
			fontSize: 16,
			padding: '2px 5px',
			background: 'transparent',
			color: 'rgba(255, 255, 255, 0.5)',
			border: 'none',
			outline: 'none',
			'&:hover': {
				color: '#e74c3c',
			}
		}
  },
  capacity: {
    fontSize: 18,
    position: 'absolute',
    top: 12,
    left: '33%',
    lineHeight: '22px',
    '& i': {
      fontSize: '22px',
      marginLeft: 5,
      marginTop: 2,
      verticalAlign: 'text-bottom',
    }
  },
	tableTag: {
		width: '100%',
		'& td': {
			padding: 5,
		}
  },
  fieldsContainer: {
    width: 80,
    display: 'inline-block'
  },
  buttonContainer: {
    width: 160,
    margin: '0 auto'
  }
});
