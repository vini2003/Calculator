import './History.scss';
import React, { ReactElement, useState } from 'react';

export interface HistoryProps {
  content: string;
}

export const History: React.FC<HistoryProps> = (props) => {
  function element(): ReactElement {
    return (
      <div className='history'>
        <input
          type='text'
          value={props.content}
          placeholder=''
          className='history-field'
        />
      </div>
    );
  }

  return element();
};

export default History;
