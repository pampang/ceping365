import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import axios from 'axios';

import DISC_ANSWERS from './disc_answers.json';
import './style.less';

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const { resultType } = query;
    const answer = DISC_ANSWERS.find((a) => {
      return a.type === resultType.toUpperCase();
    });
    return {
      answer,
    };
  }

  renderAnswer = () => {
    const { answer } = this.props;
    return (
      <div className="answer">
        <p className="answer__title">
          {answer.description}
        </p>
        {answer.content.map((item) => {
          return (
            <p className="answer__row">
              {item.type}
              {item.text}
            </p>
          )
        })}
      </div>
    )
  }

  render () {
    const { answer } = this.props;
    return (
      <div className='container'>
        <Head>
          <title>结果页-免费性格测评-放心做，绝对免费！</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
        <div className="answer">
          <p className="answer__description">
            {answer.description}
          </p>
          {answer.content.map((item) => {
            return (
              <p className={`answerRow__${item.type}`}>
                {item.text}
              </p>
            )
          })}
        </div>
      </div>
    )
  }
}
