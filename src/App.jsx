import React, {Component} from 'react';

import './app.styl';
import SelectSearch from './components/SelectSearch'

class App extends Component{
    render(){
        let items = [
            {value:"1",name:"Петр"},
            {value:"2",name:"Алексей"},
            {value:"3",name:"Иван"},
            {value:"4",name:"Николай"},
            {value:"5",name:"Тимон"},
            {value:"6",name:"Александр"},
            {value:"7",name:"Роман"},
        ]
        return(
            <div className="App">
                <div className="App__wrapper">
                    <div className="App__content">
                        <h1>React Select Search</h1>
                        <div className="App__select-wrapper">
                            <SelectSearch
                                items={items}
                                placeholder="Выберите страну"
                            />
                        </div>
                    </div>
                    <div className="App__footer">
                        <div className="App__select-wrapper">
                            <SelectSearch
                                items={items}
                                placeholder="Выберите страну"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App