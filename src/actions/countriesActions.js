export const COUNTRIES_SET_LIST = "COUNTRIES_SET_LIST";
export const COUNTRIES_COUNTRY_SELECT = "COUNTRIES_SET_COUNTRY";

export function SetList(countries) {
    return (dispatch)=>{
        dispatch({
            type:COUNTRIES_SET_LIST,
            payload:countries
        })
    }
}

export function SelectCountry(value) {
    return (dispatch)=>{
        dispatch({
            type:COUNTRIES_COUNTRY_SELECT,
            payload:value
        })
    }
}