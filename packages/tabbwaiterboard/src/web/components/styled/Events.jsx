import styled from 'styled-components'
import { darken } from 'polished'

export const ActionBox = styled.div`
  position: relative;
  background: rgba(255,255,255,0.95);
  width: calc(50% - 20px);
  margin: 0 10px 10px 0;
  color: black;
  display: inline-block;
`;

export const Header = styled.div`
  form {
    display: inline-block;
  }
  .FormInput {
    display: inline-block;
  }
`;
export const CheckButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  float: right;
  border: none;
  background:  ${props => props.bg};
  color: white;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  ${p => p.invisible ? 'opacity: 0;' : ''}
  ${p => p.flash ? 'animation: vhs-flash 0.7s infinite;' : ''}
  i {
    font-size: 24px;
  }
  &:hover {
    background: ${props => darken(0.06, props.bg)};
  }
  &:active {
    background: ${props => darken(0.12, props.bg)};
  }
`;

export const TableId = styled.div`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  height: 70px;
  line-height: 70px;
  width: 70px;
  border: none;
  background: ${props => props.bg};
  outline: none;
  color: rgba(255,255,255,1);
  font-size: 22px;
  font-weight: 400;
`;

export const Photo = styled.div`
  background-color: white;
  display: inline-block;
  vertical-align: middle;
  background-image: url(${props => props.url});
  width: 40px;
  height: 40px;
  background-size: 44px;
  border-radius: 50%;
  background-position: center;
  margin: 0 10px 0 20px;
`;

export const Name = styled.div`
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  text-align: center;
  margin: 5px 0;
  color: #666;
  font-weight: 300;
`;

export const TableTag = styled.table`
  width: 100%;
  border-spacing: 0;
  padding: 0;
`;

export const Th = styled.th`
  color: ${props => props.color};
  font-weight: 300;
  padding-bottom: 5px;
  text-align: right;
  padding: 15px 10px 15px;
  font-weight: 300;
  text-align: center;
  &:nth-child(odd) {
    background: rgba(0,0,0,0.05);
  }
  &:nth-child(even) {
    background: rgba(0,0,0,0.03);
  }
  &:first-child {
    text-align: left;
  }
`;
export const Td = styled.td`
  color: #666;
  color: ${props => props.color};
  font-weight: ${p => p.bold ? 600 : 300};;
  padding: 5px 10px;
  font-size: 13px;
  max-width: 120px;
  text-align: ${p => p.items ? 'left' : 'center'};
  vertical-align: ${p => p.items ? 'top' : 'middle'};
  font-weight: 500;
  &:nth-child(odd) {
    background: rgba(0,0,0,0.02);
  }
  &:nth-child(even) {
    background: rgba(0,0,0,0);
  }
  &:first-child {
    text-align: left;
    letter-spacing: 1px;
    font-weight: 300;
  }
`;

export const Tr = styled.tr`
  td {
    border-bottom: 1px dashed rgba(0,0,0,0.1);
  }
  &:last-child {
    td {
      padding-bottom: 20px;
      border-width: 0;
    }
  }
`

export const Color = styled.span`
  color: ${p => p.color}
`

export const Text = styled.span`
  color: ${(p) => p.color};
  font-weight: 500;
  margin: 0 30px;
  text-align: center;
  position: absolute;
  top: 25px;
  right: 70px;
`;

const foodItemColors = [
  '#ef5350',
  '#7E57C2',
  '#29B6F6',
  '#9CCC65',
  '#FFCA28',
  '#8D6E63'
]

export const FoodItem = styled.div`
  display: inline-block;
  background: ${p => foodItemColors[p.bgIndex]};
  margin: 3px;
  border-radius: 40px;
  color: white;
  padding: 3px 12px;
  letter-spacing: 0.3px;
  font-weight: 400;
`
