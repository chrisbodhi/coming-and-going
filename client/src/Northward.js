import React from 'react';

/* change margin-left based on `position` */
const divStyle = (position) => ({
  backgroundColor: 'red',
  border: '1px solid red',
  height: position,
  width: 10
});

const Northward = (props) => {
  const { position } = props;
  return <div
    style={divStyle(position)}
  />;
};

export default Northward;
