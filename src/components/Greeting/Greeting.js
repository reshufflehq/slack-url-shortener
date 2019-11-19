/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Container from 'react-bootstrap/Container';

import gif from '../../assets/show.gif';
import './greeting.css';

export default function Greeting() {
  return (
    <Container className='alert' role='alert'>
      This app is a URL shortener Slack Slash command:
      <br />
      <img alt='slack-gif' className='pt-2 pb-2' src={gif} />
      <br />
      How to connect your Slack to get the URL shortener:
      <ol>
        <li>
          Go to
          <a target='_blank' href='http://api.slack.com'>
            {' '}
            api.slack.com
          </a>
        </li>
        <li>
          Create a new app and configure two slash commands:
          <ul>
            <li>/go should point to {window.location.href}go</li>
            <li>/set-go should point to {window.location.href}set-go</li>
          </ul>
        </li>
        <li>Go to Slack and run: /go reshuffle</li>
        <li>
          Click{' '}
          <a href='' onClick={() => window.location.reload()}>
            {' '}
            here
          </a>{' '}
          to make this message go away afterwards (if the message does not go
          away, the connection is not working)
        </li>
      </ol>
    </Container>
  );
}
