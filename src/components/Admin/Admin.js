/* eslint-disable react/jsx-no-target-blank */
import '@reshuffle/code-transform/macro';
import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Display } from '../../constants/constants';
import {
  addNewUrl,
  deleteLink,
  getLinks,
  checkIsConnected,
} from '../../../backend/backend';
import './Admin.css';
import Greeting from '../Greeting/Greeting';

export default function Admin() {
  const [inputValue, setInputValue] = useState('');
  const [linksList, setLinksList] = useState([]);
  const [display, setDisplay] = useState(Display.NO_ITEMS);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    async function fetchFromDb() {
      const links = await getLinks();
      updateDisplay(links);
      setIsConnected(await checkIsConnected());
    }
    fetchFromDb();
  }, []);

  const handleAddLink = async () => {
    try {
      const text = inputValue;

      // prevent empty string to add in list
      if (!text) return;
      const data = text.split(' ');
      const links = await addNewUrl(data[0], data[1]);
      updateDisplay(links);
      setInputValue('');
    } catch (error) {
      console.error('Error on adding link to db');
    }
  };

  const handleChange = ({ which, target, keyCode }) => {
    if (which === 13 || keyCode === 13) {
      handleAddLink();
      return;
    }
    setInputValue(target.value);
  };
  const handleDeleteList = async (url) => {
    const links = await deleteLink(url);
    updateDisplay(links);
  };

  const updateDisplay = (links) => {
    var t = links && links.length > 0 ? Display.LIST : Display.NO_ITEMS;
    setDisplay(t);
    setLinksList(links);
  };

  return (
    <Container className='mt-4 mb-5'>
      {!isConnected && <Greeting />}
      <Row>
        <Col className='col-md-10 col-sm-10'>
          <h1 className='pt-4 pb-4 title'>{`Short Link list (${
            display === Display.LIST && linksList ? linksList.length : 0
          })`}</h1>
          <Row className='mr-0 ml-0 pb-4'>
            <Col className='pl-0 pr-0'>
              <Form.Control
                as='input'
                type='text'
                placeholder='Add short link: word url'
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleChange}
              />
            </Col>
            <Col className='col-1 pl-1 pr-0'>
              <Button onClick={handleAddLink} className='url-add'>
                +
              </Button>
            </Col>
          </Row>

          {display === Display.LIST &&
            linksList.map((url) => (
              <Row className='ml-0 url-row' key={url.key} variant='info'>
                <Button
                  className='delete'
                  size='sm'
                  onClick={() => handleDeleteList(url.key)}
                >
                  X
                </Button>
                <Col className='col-10 trim-text'>
                  <span>
                    {url.key.substring(6)} <b>maps to</b> {url.value}
                  </span>
                </Col>
              </Row>
            ))}
          {display === Display.NO_ITEMS &&
            `No urls where found. its great time to add new short link.`}
        </Col>
      </Row>
    </Container>
  );
}
