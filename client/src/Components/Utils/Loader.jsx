import React from 'react';
import { Spin } from 'antd';

const Loader = () => (
  <div className="loader" style={{color:"black",borderColor: "red"}}>
    <Spin />
  </div>
);

export default Loader;
