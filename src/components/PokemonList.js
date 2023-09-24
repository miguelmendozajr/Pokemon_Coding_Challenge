import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fetchData('/pokemon')
      .then((data) => {
        setPokemon(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleSortChange = () => {
    setSort((prevSort) => !prevSort);
  };

  const filteredPokemon = filterData(pokemon, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      <List
        style={{ background: '#f5f5f5', borderRadius: '10px', padding: '20px' }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedPokemon}
        renderItem={(poke) => (
          <List.Item>
            <Link
              to={`/pokemon/${poke.url.split('/')[poke.url.split('/').length - 2]}`}
            >
              <Card
                hoverable
                style={{ borderRadius: '10px', transition: 'all 0.3s ease' }}
                cover={<img alt={poke.name} src={"https://freepngimg.com/download/pokemon/20250-9-pokeball-photo.png"} />}
                bodyStyle={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card.Meta title={poke.name.toUpperCase()} style={{ textAlign: 'center' }} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}

export default PokemonList;
