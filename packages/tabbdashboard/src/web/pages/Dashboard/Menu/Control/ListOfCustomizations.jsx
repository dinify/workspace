// @flow
import React from 'react'
import styled from 'styled-components'

export const Customizations = styled.div `
  margin-top: 10px;
`

const customItemColors = [
  '#ef5350',
  '#7E57C2',
  '#29B6F6',
  '#9CCC65',
  '#FFCA28',
  '#8D6E63',
  '#ef5350',
  '#7E57C2',
  '#29B6F6',
  '#9CCC65',
  '#FFCA28',
  '#8D6E63'
]

export const CustomItem = styled.div `
  display: inline-block;
  background: ${p => customItemColors[p.bgIndex] ? customItemColors[p.bgIndex] : 'black'};
  margin: 3px;
  border-radius: 40px;
  color: white;
  padding: 3px 12px;
  letter-spacing: 0.3px;
  font-weight: 400;
  font-size: 12px;
  button {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    color: rgba(255,255,255,0.6);
    margin-left: 5px;
    &:hover {
      color: white;
    }
  }
`

const ListOfCustomizations = ({
  list,
  rmButtonFunction
}) => {
  if (list && list.length > 0) {
    return (
      <Customizations>
				{list.map((customization, i) =>
          <CustomItem key={i} bgIndex={i}>
            <span style={{whiteSpace: 'nowrap'}}>
              {customization.name} {customization.price ? `${customization.price.amount}KD` : ''}
            </span>
            <button onClick={() => rmButtonFunction(customization)}>
              <i className="ion-close" />
            </button>
          </CustomItem>
				)}
			</Customizations>
    )
  }
  return null
}

export default ListOfCustomizations
