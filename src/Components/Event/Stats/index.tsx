import React from 'react';
import css from 'styled-jsx/css';

import { IEventStats } from './Stats';

const styles = css`
  .status {
    font-size: 0.9rem;
  }
`;

export const EventStats: React.FunctionComponent<IEventStats.IProps> = ({
  stackCount,
  newsCount,
}) => {
  if (!newsCount && !stackCount) {
    return (
      <div className="status">
        <span className="light-font">事件尚无相关新闻</span>
        <style jsx>{styles}</style>
      </div>
    );
  }

  return (
    <div className="status">
      <span>{'事件共有 '}</span>
      {stackCount ? (
        <span>
          <span className="light-font">{`${stackCount} `}</span>
          个进展
        </span>
      ) : (
        <div />
      )}
      {stackCount && newsCount ? <span>、</span> : <div />}
      {newsCount ? (
        <span>
          <span className="light-font">{`${newsCount} `}</span>
          条新闻
        </span>
      ) : (
        <div />
      )}
      <style jsx>{styles}</style>
    </div>
  );
};