import '@reshuffle/code-transform/macro';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { getLinks } from '../../backend/backend';

const generateRandomListItem = list => {
  return Math.floor(Math.random() * list.length);
};

export default function Admin() {
  const [linksList, setLinksList] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function fetchFromDb() {
      const links = await getLinks();
      setLinksList(links);
      if (links && links.length > 0) {
        const random = generateRandomListItem(links);
        setUrl(links[random]);
      }
    }
    fetchFromDb();
  }, []);

  const handleClick = event => {
    if (linksList && linksList.length > 0) {
      const random = generateRandomListItem(linksList);
      setUrl(linksList[random]);
    }
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center p-3'>
        <Col>
          <Image
            className='img-fluid'
            src={`${url}`}
            rounded
            onClick={handleClick}
          />
        </Col>
      </Row>
    </Container>
  );
}
