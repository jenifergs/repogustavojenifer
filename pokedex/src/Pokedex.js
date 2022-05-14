import React from 'react';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    state ={
        pokemons: this.props.pokemons, // lista de todos os pokemons
        currentIndex: 0, // contador do index
        myListPokemons: this.props.pokemons, // lista de pokemons filtrados
        filter:'',
    }

    next = () => {

      this.setState((prevState) => { // prevstate é state inicial 
        let nextIndex = prevState.currentIndex +1
        if(prevState.myListPokemons.length -1 === prevState.currentIndex) // quando o ultimo index for igual ao primeiro
        nextIndex = 0 // ele retorna pra zero

            return {
                currentIndex: nextIndex // incrementa o contador

            }
      })
  };

filterPokemon (filter) { // função para filtrar os pokemons pelos tipos 

    const filteredData = this.state.pokemons.filter( pokemon => {
        if (filter === '') return true
        return pokemon.type === filter
    })

this.setState({
    filter: filter,
    myListPokemons: filteredData,
    currentIndex: 0, // quando trocar o filtro, o index tem que retornar a 0
})
}

listHasMoreThanOne = () => {
    return this.state.myListPokemons.length > 1 // função para verificar a quantidade de index
}

getTypesPokemons = () => {
    const types = this.state.myListPokemons.map(pokemon => pokemon.type ) // percorre os pokemons pelos tipos
      return [...new Set(types)].sort() // ordena os tipos
}

    render() {
        const { myListPokemons, currentIndex } = this.state // desestruturção do state
        return (
            <div>
            <div>
                <button onClick={ () => this.filterPokemon('') }>All</button>
                {this.getTypesPokemons().map( pokemonType =>
                        (<button onClick={ () => this.filterPokemon(pokemonType) }>{pokemonType}</button>))
                }
            </div>

            <div className="pokedex">
                <Pokemon key={myListPokemons[currentIndex].id} pokemon={myListPokemons[currentIndex]} />
            </div>
            <div>
                <button onClick= { () => this.next() } disabled={ !this.listHasMoreThanOne()}> Next </button>
            </div>
            </div>
        );
    }
}

export default Pokedex;