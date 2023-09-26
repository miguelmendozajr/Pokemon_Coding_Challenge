import { Card, Spin, Alert } from 'antd';
import useFetch from 'hooks/useFetch';

function PokemonDetail({ match }) {

  const {pokemon, isLoading, error } = useFetch(`pokemon/${match.params.id}`);
  
  if (isLoading) return <Spin tip="Loading" size="large"><div style={{ marginTop: '30px' }} className="content" /></Spin>;

  if (error) return <Alert message={error} type="error" description="Something went wrong..." showIcon style={{ marginTop: '20px' }} />;


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
      <Card 
        style={{ width: 300 }}
        cover={<img alt={pokemon.name} src={pokemon.sprites?.front_default} />}
      >
        <Card.Meta 
          title={pokemon.name.toUpperCase()} 
          description={
            <>
              <p><b>Height:</b> {pokemon.height}</p>
              <p><b>Weight:</b> {pokemon.weight}</p>
              <p><b>Type:</b> {pokemon.types.map(type => type.type.name).join(', ')}</p>
            </>
          }
        />
      </Card>
    </div>
  );
}

export default PokemonDetail;
