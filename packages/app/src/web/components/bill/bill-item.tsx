import React from 'react';

export default () => <div></div>;
// import { connect } from 'react-redux';
// // import { useTranslation } from 'react-i18next';
// import { RootState } from 'typesafe-actions';
// import { Motion, spring } from 'react-motion';

// import { withStyles } from '@material-ui/core/styles';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import Typography from '@material-ui/core/Typography';
// import CheckCircle from '@material-ui/icons/CheckCircleRounded';
// import { OrderItemN } from 'CartModels';

// export interface BillItemProps {
//   orderItemId: string,
//   selected?: boolean,
//   onClick?: () => void
// }

// const styles = (theme: any) => ({
//   cartItemImage: {
//     width: 56,
//     height: 56,
//     borderRadius: 4,
//     backgroundColor: theme.palette.divider,
//     overflow: 'hidden'
//   },
//   foreignItem: {
//     width: 64,
//     height: 64,
//     marginLeft: -4,
//     marginTop: -4,
//     borderRadius: 8,
//     border: `2px solid ${theme.palette.primary.main}`,
//     backgroundColor: 'transparent',
//     padding: 2
//   },
//   lockedItem: {
//     width: 64,
//     height: 64,
//     marginLeft: -4,
//     marginTop: -4,
//     borderRadius: 8,
//     border: `1px solid ${theme.palette.divider}`,
//     backgroundColor: 'transparent',
//     padding: 3
//   },
//   imageSrc: {
//     width: 56,
//     height: 56,
//     borderRadius: 4,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   },
//   bg: {
//     backgroundColor: theme.palette.background.default
//   }
// });

// const BillItem: React.FC<BillItemProps & {
//   orderItem: OrderItemN
//   classes?: any
// }> = ({
//   orderItem: item,
//   selected = false,
//   onClick = () => {},
//   classes
// }) => {
//   const images = item.menuItem.images;
//   const rippleRadius = Math.sqrt(56**2 + 56**2);
//   const divisor = item.owners.length;
//   return (
//     <Motion
//       defaultStyle={{x: 0}}
//       style={{x: spring(selected ? 1 : 0, { stiffness: 260, damping: 24 })}}>
//       {(style1: any) =>
//         <ButtonBase
//           disableRipple
//           onClick={onClick}
//           className={classes.bg}
//           style={{
//             display: 'flex',
//             minWidth: '100%',
//             textAlign: 'start',
//             borderRadius: 4,
//             backgroundColor: `rgba(0,0,0,${Math.min(1, 0.06 * style1.x)})`
//           }} >
//           <div
//             style={{
//               position: 'relative',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               overflow: 'hidden',
//             }}
//             className={`${classes.cartItemImage} ${item.locked ? classes.lockedItem : '')}`}>
//               {images.length > 0 &&
//                 <div
//                   className={classes.imageSrc}
//                   style={{
//                     backgroundImage: `url(${images[0].url})`
//                   }}
//                 />
//               }
//               <Motion
//                 defaultStyle={{x: 0}}
//                 style={{x: spring(selected ? 1 : 0, { stiffness: 260, damping: 24 })}}>
//                 {(style: any) =>
//                   <div style={{
//                     position: 'absolute',
//                     backgroundColor: '#c13939',
//                     borderRadius: rippleRadius / 2,
//                     minHeight: rippleRadius,
//                     minWidth: rippleRadius,
//                     opacity: Math.min(1, style.x * 2),
//                     transform: `scale(${Math.max(style.x, 1/rippleRadius)}, ${Math.max(style.x, 1/rippleRadius)})`,
//                   }}/>
//                 }
//               </Motion>
//               <Motion
//                 defaultStyle={{x: 0}}
//                 style={{x: spring(selected ? 1 : 0, { stiffness: 480, damping: selected ? 15 : 24 })}}>
//                 {(style: any) =>
//                   <div style={{
//                     position: 'absolute',
//                     color: '#fff',
//                     opacity: Math.min(1, style.x),
//                     transform: `translate3d(0,0,0) scale(${style.x}, ${style.x})`,
//                   }}>
//                     <CheckCircle />
//                   </div>
//                 }
//               </Motion>
//           </div>
//           <div style={{flex: 1, marginLeft: 16, position: 'relative'}}>
//             <div style={{display: 'flex', justifyContent: 'start'}}>
//               <Typography style={{flex: 1,  marginRight: 32}}>
//                 {item.menuItem && item.menuItem.name}
//               </Typography>
//               <Typography
//                 style={{
//                   alignSelf: 'flex-end',
//                   textDecoration: divisor > 1 ? 'line-through' : 'none',
//                 }}
//                 color={divisor > 1 ? 'textSecondary' : 'textPrimary'}
//                 variant="overline">
//                 <Price price={divisor > 1 ? item.orgsubtotal : item.subtotal}/>
//               </Typography>
//             </div>
//             <div style={{display: 'flex', justifyContent: 'start'}}>
//               <Typography style={{flex: 1,  marginRight: 32}} color="textSecondary" variant="caption">
//                 {(() => {
//                   if (divisor === 1) return '';
//                   if (item.locked) return 'Partially paid by others';
//                   return `Split between ${divisor} people`;
//                 })()}
//               </Typography>
//               {divisor > 1 && <Typography
//                 style={{alignSelf: 'flex-end'}}
//                 variant="overline">
//                 {item && <Price price={item.subtotal}/>}
//               </Typography>}
//             </div>
//           </div>
//         </ButtonBase>
//       }
//     </Motion>
//   );
// };

// export default connect(
//   (state: RootState, props) => ({
//     subtotal: state.cart.subtotal,
//     orderItem: 
//   }), { })(withStyles(styles)(BillItem));