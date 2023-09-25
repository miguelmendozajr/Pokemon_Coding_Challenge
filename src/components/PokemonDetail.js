import { Card } from 'antd';
import useFetch from 'hooks/useFetch';

function PokemonDetail({ match }) {

  const {pokemon, isLoading, error } = useFetch(`pokemon/${match.params.id}`);
  
  if (isLoading) return <div>Loading...</div>;
  
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
      <Card 
        style={{ width: 300 }}
        cover={<img alt={pokemon.name} src={pokemon.sprites?.front_default} />}
      >
        <Card.Meta 
          title={pokemon.name} 
          description={
            <>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
            </>
          }
        />
      </Card>
    </div>
  );
}

export default PokemonDetail;
