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

      this.setState((prevState) => { // prevstate é o state inicial da lista
        let nextIndex = prevState.currentIndex +1
        if(prevState.myListPokemons.length -1 === prevState.currentIndex) // quando o ultimo index for igual ao tamanho do primeiro...
        nextIndex = 0 // ...ele retorna pra zero

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
    myListPokemons: filteredData, // muda a lista dos pokemons para mostrar apenas os filtrados
    currentIndex: 0, // quando trocar o filtro, o index tem que retornar a 0
})
}

listHasMoreThanOne = () => {
    return this.state.myListPokemons.length > 1 // função para verificar a quantidade de index para desabilitar ou habilitar o botão next
}

getTypesPokemons = () => { // função para pegar os tipos dos pokémons para fazer os botões de filtro
    const types = this.state.myListPokemons.map(pokemon => pokemon.type ) // percorre todos os pokemons pelos tipos
      return [...new Set(types)].sort() // filtra os tipos duplicados do map e os ordena
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
            {
                // o primeiro button All é feito manualmente só usando o param vazio na funcão filtro, que retorna todos os pokemons
                //o resto dos botões são criados por um map que pega todos os tipos da getTypesPokemons e os transforma em botões, reutilizando o parametro pra fazer o filtro também
            }

            <div className="pokedex">
                <Pokemon key={myListPokemons[currentIndex].id} pokemon={myListPokemons[currentIndex]} />
            </div>
            <div>
                <button onClick= { this.next } disabled={ !this.listHasMoreThanOne()}> Next </button> 
            {
                //no disabled chama a função listHasMoreThanOne com o operador "!" no this que detecta o booleano da função e fica desabilitado ou não dependendo do número de pokémons
            }
            </div>
            </div>
        );
    }
}

export default Pokedex;