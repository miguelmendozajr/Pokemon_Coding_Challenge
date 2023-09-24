import { useState } from 'react';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import useFetch from 'hooks/useFetch';

function PokemonList() {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPokemons = 1000
  const limit = 20

  const {pokemon , isLoading, error } = useFetch(`?limit=${limit}&offset=${currentPage * limit - limit}`);
  
  if (isLoading) return <div>Loading...</div>;
  
  if (error) return <div>{error}</div>;

  const filteredPokemon = filterData(pokemon.results, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleSortChange = () => {
    setSort((prevSort) => !prevSort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
      <Pagination 
        total={ totalPokemons / limit } 
        defaultCurrent={currentPage} 
        pageSize={1} 
        onChange={handlePageChange}
      />
    </div>
  );
}

export default PokemonList;
