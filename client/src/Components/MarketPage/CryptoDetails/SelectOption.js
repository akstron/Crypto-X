import React from 'react'
import { Select } from 'antd';

const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
const { Option } = Select;

const SelectOption = ({setTimePeriod}) => {
    return (
        <Select defaultValue="7d" className="select-timeperiod" 
            placeholder="Select Timeperiod" 
            onChange={(value) => setTimePeriod(value)}>
            {time.map((date) => <Option key={date}>{date}</Option>)}
        </Select>
    )
}

export default SelectOption
