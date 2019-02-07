// @flow
import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Container, Header, Spinner, Body, Title } from 'native-base'

const App = ({ }) => (
  <Container>
    <View style={{ flex: 1 }}>
      <Header>
        <Body>
          <Title>Universal React</Title>
        </Body>
      </Header>
    </View>
  </Container>
)

export default connect(state => ({}))(App)
