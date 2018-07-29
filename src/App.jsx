import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as countriesActions from './actions/countriesActions';
import './app.styl';
import SelectSearch from './components/SelectSearch'
import countries from './data/countries.json'

class App extends Component{
    constructor(props){
        super(props);

        const {countriesActions} = props;

        let countriesItems=[]
        for(let key in countries){
            countriesItems.push({
                value:key,
                name:countries[key]
            })
        }

        countriesActions.SetList(countriesItems);
    }

    handleOnCountryChange(value){
        const {countriesActions} = this.props;

        countriesActions.SelectCountry(value);
    }

    render(){
        const {countries} = this.props;
        return(
            <div className="App">
                <div className="App__wrapper">
                    <div className="App__content">
                        <h1>React Select Search</h1>
                        <div className="App__select-wrapper">
                            <SelectSearch
                                items={countries.countriesList}
                                placeholder="Выберите страну"
                                onChange={(value)=>this.handleOnCountryChange(value)}
                                value={countries.selectedCountry}
                            />
                        </div>
                    </div>
                    <div className="App__footer">
                        <div className="App__select-wrapper">
                            <SelectSearch
                                items={countries.countriesList}
                                placeholder="Выберите страну"
                                onChange={(value)=>this.handleOnCountryChange(value)}
                                value={countries.selectedCountry}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        countries:state.countries
    }
}

function mapDispatchToProps(dispatch) {
    return{
        countriesActions:bindActionCreators(countriesActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
