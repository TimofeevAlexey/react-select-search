import {COUNTRIES_COUNTRY_SELECT,COUNTRIES_SET_LIST} from '../actions/countriesActions';

const initialState={
    selectedCountry:"",
    countriesList:[]
}

export default function countries(state = initialState, action){
    switch(action.type){
        case COUNTRIES_COUNTRY_SELECT:
            return {
                ...state,
                selectedCountry:action.payload
            }
        case COUNTRIES_SET_LIST:
            return{
                ...state,
                countriesList:action.payload
            }
        default:
            return state;
    }
}
