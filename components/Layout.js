import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Title,
} from 'native-base';
import PropTypes from 'prop-types';

export const Layout = ({left, right, title, footer, children}) => (
  <Container>
    <Header style={styles.Header}>
      {left && <Left>{left}</Left>}
      <Body>
        <Title>{title}</Title>
      </Body>
      {right && <Right>{right}</Right>}
    </Header>
    {children}
    <Footer>
      <FooterTab>{footer}</FooterTab>
    </Footer>
  </Container>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  left: PropTypes.node,
  right: PropTypes.node,
  footer: PropTypes.node,
};

const styles = StyleSheet.create({
  Header: {
    marginLeft: 10,
    backgroundColor: '#5f27cd',
  },
});
