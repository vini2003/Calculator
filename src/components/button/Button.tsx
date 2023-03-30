import './Button.scss';
import React, { ReactElement, useState } from 'react';
import { Token } from '../../math/Operation';

export interface ButtonProps {
  enabled?: boolean;
  locked?: boolean;
  important?: boolean;

  label?: string;

  key?: Token;

  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const defaultProps: ButtonProps = {
    enabled: true,
    locked: false,
    important: false,
  };
  props = { ...defaultProps, ...props };

  const [enabled, setEnabled] = useState(props.enabled);
  const [locked, setLocked] = useState(props.locked);
  const [label, setLabel] = useState(props.label);
  const [important, setImportant] = useState(props.important);
  const [key, setKey] = useState(props.key);

  function onClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  function element(): ReactElement {
    if (!enabled) {
      return <div className='button disabled'>{label ?? ''}</div>;
    }

    if (locked) {
      return <div className='button locked'>{label ?? ''}</div>;
    }

    if (important) {
      return (
        <div className='button important' onClick={onClick}>
          {label ?? ''}
        </div>
      );
    } else {
      return (
        <div className='button enabled' onClick={onClick}>
          {label ?? ''}
        </div>
      );
    }
  }

  return element();
};

export default Button;
