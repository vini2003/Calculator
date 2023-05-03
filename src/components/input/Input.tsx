import './Input.scss';
import React, { ReactElement, useState } from 'react';
import { useAppContext } from "../../App";

export interface InputProps {
  content?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const defaultProps: InputProps = { content: '' };
  props = { ...defaultProps, ...props };

  const [content, setContent] = useState(props.content);

  const appState = useAppContext();
  appState.content = content;
  appState.setContent = setContent;

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == 'Enter') {
      appState.solve();
    }
  }

  function element(): ReactElement {
    return (
      <div className='input'>
        <input
          type='text'
          value={content}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          placeholder=''
          className='input-field'
        />
      </div>
    );
  }

  return element();
};

export default Input;
