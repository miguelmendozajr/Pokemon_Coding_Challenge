import { useState } from 'react';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card, Pagination, Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';
import useFetch from 'hooks/useFetch';

function PokemonList() {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState( localStorage.getItem('sort')  === "true" ? true : false);
  const [currentPage, setCurrentPage] = useState(1);
  const {pokemon, isLoading, error } = useFetch(`pokemon?limit=1292`);

  if (isLoading) return <Spin tip="Loading" size="large"><div style={{ marginTop: '30px' }} className="content" /></Spin>;

  if (error) return <Alert message={error} type="error" description="Something went wrong..." showIcon style={{ marginTop: '20px' }} />;

  const filteredPokemon = filterData(pokemon.results, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  const handleFilterChange = (filter) => {
    handlePageChange(1)
    setFilter(filter);
  };

  const handleSortChange = () => {
    setSort((prevSort) => !prevSort);
    localStorage.setItem('sort', !sort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const size = 20;

  const displayPokemon = sortedPokemon.slice( (currentPage - 1) * size, currentPage * size);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} defaultValue={sort}/>
      <List
        style={{ background: '#f5f5f5', borderRadius: '10px', padding: '20px', minHeight: '60vh' }}
        grid={{ gutter: 16, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5}}
        dataSource={displayPokemon}
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
                <Card.Meta className="ant-card-meta-title" title={poke.name.toUpperCase()} style={{ textAlign: 'center' }} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
      <Pagination 
        current={currentPage}
        total={Math.round(filteredPokemon.length)} 
        showSizeChanger={false}
        pageSize = {size}    
        onChange={handlePageChange}
      />
    </div>
  );
}

export default PokemonList;
