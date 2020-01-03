import React from 'react'
import ReactDOM from "react-dom";
import { DatePicker, } from 'antd';

const { MonthPicker } = DatePicker;

class ExpiryDate extends React.Component {
    state = {
      size: 'default',
    };
    handleSizeChange = e => {
      this.setState({ size: e.target.value });
    };
    render() {
      const { size } = this.state;
      return (
        <div>
          <MonthPicker style={{ width: 100}} size={size} placeholder = ""/>
        </div>
      );
    }
  }
  
  export default ExpiryDate;