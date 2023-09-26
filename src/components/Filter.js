import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

function Filter({ onFilterChange, onSortChange, defaultValue }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '0 20px' }}>
      <Input 
        id="pokemonInput"
        placeholder="Filter Pokémon by name" 
        onChange={(e) => onFilterChange(e.target.value.trim()) }
        style={{ width: '60%' }}
      />
      <Select 
        defaultValue={defaultValue} 
        onChange={onSortChange}
        style={{ width: '35%' }}
      >
        <Option value={false}>Name (A-Z)</Option>
        <Option value={true}>Name (Z-A)</Option>
      </Select>
    </div>
  );
}

export default Filter;
