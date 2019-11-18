/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputCopy from './InputCopy';

export default function PreviewFrame() {
  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center p-1'>
        <Col fluid='true'>
          <iframe
            src='/live'
            width='400px'
            height='500px'
            frameBorder='0'
            title='cats'
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputCopy />
        </Col>
      </Row>
    </Container>
  );
}
