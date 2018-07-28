import React, {Component} from 'react';
import PropTypes from 'prop-types';
import equal from 'deep-equal';
import checkBrowser from 'check-browser';
import enhanceWithClickOutside from 'react-click-outside';
import classNames from 'classnames';
import clone from 'clone';

import './style.styl';

class SelectSearch extends Component {
    constructor(props){
        super(props);

        this.state={
            value:"",
            searchValue:"",
            defaultItems:props.items,
            filteredItems:props.items,
            isDropdownOpen:false
        }
    }
    static getDerivedStateFromProps(props, state){

       if(props.items !== state.defaultItems){
           return{
               ...state,
               defaultItems:props.items
           }
       }

        return null;
    }

    handleClickOutside() {
        this.setState({
            isDropdownOpen:false
        });
    }
    handleBoxOnClick(e){


        this.setState({
            isDropdownOpen:true
        },()=> this.searchInput.focus());
    }
    handleOnChangeSearch(e){
        const value = e.target.value;

        let filteredItems = this.state.defaultItems.filter((f)=>{
            return (f.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        })

        this.setState({
            searchValue:value,
            filteredItems:filteredItems
        })
    }
    handleItemOnClick(value){
        this.setState({
            value,
            isDropdownOpen:false,
            searchValue:"",
            filteredItems:this.state.defaultItems
        })
    }

    helperIsMobile(){
       return checkBrowser({android:"",ios:""})
    }
    helperGetItemName(value){
        if(this.state.searchValue.length !== 0){
            let reg = new RegExp(this.state.searchValue, 'gi');
            value = value.replace(reg, (str) =>
                 `<span>${str}</span>`
            );
        }
        return value
    }

    render() {
        return (
            <div className="SelectSearch">
                {
                   this.helperIsMobile()?
                        <select
                            className="SelectSearch__select"
                            ref={(select)=>this.select = select}
                        >
                            {
                                this.state.filteredItems.map((elem)=>{
                                    return(
                                        <option value={elem.value} key={elem.value}>{elem.name}</option>
                                    )
                                })
                            }
                        </select>
                   :null
                }
                <div
                    className={
                        classNames({
                            "SelectSearch__box":true,
                            "SelectSearch__box_open":this.state.isDropdownOpen
                        })
                    }
                    onClick={(e)=>this.handleBoxOnClick(e)}
                >
                    <div className={
                        classNames({
                            "SelectSearch__value":true,
                            "SelectSearch__value_active":!this.state.isDropdownOpen
                        })
                    }>
                        {
                            this.state.value.length > 0?
                                this.state.defaultItems.filter((f)=>{
                                    return( f.value === this.state.value )
                                })[0].name
                            :null
                        }
                    </div>
                    <input
                        type="text"
                        className={
                            classNames({
                                "SelectSearch__input":true,
                                "SelectSearch__input_active":this.state.isDropdownOpen
                            })
                        }
                        value={this.state.searchValue}
                        ref={(input)=>this.searchInput = input}
                        onChange={(e)=>this.handleOnChangeSearch(e)}
                    />
                    <div
                        className={classNames({
                            "SelectSearch__arrow":true,
                            "SelectSearch__arrow_invert":this.state.isDropdownOpen
                        })}
                    ></div>
                </div>
                {
                    this.state.isDropdownOpen?
                        <div className="dropdown SelectSearch__dropdown">
                            <ul className="dropdown__list">
                                {
                                    this.state.filteredItems.length === 0?
                                        <li className="dropdown__item dropdown__item_empty-text">нет элементов</li>
                                        :null
                                }
                                {
                                    this.state.filteredItems.map((elem)=>{
                                        return(
                                            <li
                                                className="dropdown__item"
                                                key={elem.value}
                                                dangerouslySetInnerHTML={{__html:this.helperGetItemName(elem.name)}}
                                                onClick={()=>this.handleItemOnClick(elem.value)}
                                                >
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    :null
                }

            </div>
        );
    }
}

SelectSearch.propTypes = {
    items:PropTypes.arrayOf(
        PropTypes.shape({
            value:PropTypes.string,
            name:PropTypes.string
        })
    )
};
SelectSearch.defaultProps = {
    items:[]
};


export default enhanceWithClickOutside(SelectSearch);
