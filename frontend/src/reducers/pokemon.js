const defaultState = {
    pokemonMaxIdx: 151
  };
  
  const pokemon = (state = defaultState, action) => {
    switch (action.type) {
      case 'SYMPTOM_CHOSEN':
        return {
          ...state
        }; 
      default:
        return state;
    }
  };
  
  export default pokemon;