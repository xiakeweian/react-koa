/* eslint-disable react/require-default-props */
/*
 * @Author: wuyanxia
 * @Date: 2021-08-02 18:40:06
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2021-10-19 19:12:19
 * 公共input组件
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const CmcInput = props => {
  const { onSearch, placeholder, onChange, ...restProps } = props;

  const [inputValue, setInputValue] = useState();

  const handleChange = e => {
    setInputValue(e.target.value);
    onChange(e.target.value);
    if (e.target.value.length <= 0) {
      onSearch('');
    }
  };
  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <Input
      onChange={handleChange}
      onPressEnter={handleSearch}
      suffix={
        <React.Fragment>
          <SearchOutlined
            onClick={handleSearch}
            style={{ fontSize: 16, color: 'rgba(0,0,0,0.45)' }}
          />
        </React.Fragment>
      }
      placeholder={placeholder}
      style={{ width: '21.72vw', minWidth: 250 }}
      {...restProps}
      allowClear
    />
  );
};
export default CmcInput;

CmcInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
