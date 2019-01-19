import React from 'react';
import Router from 'next/router';
// import Head from 'next/head';
import axios from 'axios';

import Header from '../../components/header';
import DISC_QUESTIONS from './disc_questions.json';
import './style.less';

const TOTAL_QUESTIONS_LENGTH = DISC_QUESTIONS.length;

export default class extends React.Component {
  // static async getInitialProps({ req }) {
  //   const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  //   return {
  //     userAgent,
  //     photos: new Array(15).fill(0).map((v, k) => k + 1)
  //   }
  // }

  state = {
    currentIndex: 0,
    options: [],
  }

  optionOnClick = (id) => {
    const { currentIndex, options } = this.state;
    const newOptions = Array.from(options);
    newOptions[currentIndex] = id;
    this.setState({
      currentIndex: currentIndex + 1,
      options: newOptions,
    });
  }

  prevStep = () => {
    const { currentIndex, options } = this.state;
    const newOptions = Array.from(options);
    newOptions.pop();
    this.setState({
      currentIndex: currentIndex - 1,
      options: newOptions,
    });
  }

  submit = async () => {
    const { options } = this.state;
    try {
      const response = await axios({
        url: '/api/disc',
        // === get 方法 ===
        // method: 'get',
        // params: {},
        // === post 方法 ===
        method: 'post',
        data: {
          options,
        },
      });
      Router.push(`/result/disc?resultType=${response.resultType}`);
    } catch (error) {
      console.log(error);
    }
  }

  renderQuestion = () => {
    const { currentIndex, options } = this.state;
    const question = DISC_QUESTIONS[currentIndex];
    return (
      <div className="question">
        <div className="question__title">
          {`${currentIndex + 1}: ${question.question}`}
        </div>
        {question.options.map((option) => {
          return (
            <div
              className="question__option"
              onClick={() => {
                this.optionOnClick(option.id);
              }}
            >
              {option.text}
            </div>
          );
        })}
        <br />
      </div>
    );
  }

  renderButtons = () => {
    const { currentIndex } = this.state;
    return (
      <div className="buttonList">
        {currentIndex !== 0 ? (
          <div className="button" onClick={this.prevStep}>
            上一步
          </div>
        ) : null}
        {currentIndex === TOTAL_QUESTIONS_LENGTH - 1 ? (
          <div className="button" onClick={this.submit}>
            提交
          </div>
        ) : null}
      </div>
    )
  }

  render () {
    const { currentIndex } = this.state;
    return (
      <div className='list'>
        <Header title="DISC性格测评-放心做，绝对免费！" />
        {this.renderQuestion()}
        {this.renderButtons()}
      </div>
    )
  }
}
