/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function InputCopy() {
  const [action, setAction] = useState('COPY');
  const url = window.location.href + 'live';
  const iframe = `<iframe src='${url}' width='400px' height='500px' frameBorder='0' title='cats'/>`;
  

  return (
    <>
      <InputGroup className='mb-3 ml-0 mr-0'>
        <Form.Control
          as='textarea'
          rows='2'
          readOnly
          value={iframe}
          placeholder={iframe}
          aria-label={iframe}
          aria-describedby='basic-addon2'
        />
      </InputGroup>
      <OverlayTrigger
        key='bottom'
        placement='bottom'
        trigger='click'
        overlay={<Tooltip id='tooltip-bottom'>Copied to clipboard! </Tooltip>}
      >
       
      </OverlayTrigger>
    </>
  );
}
