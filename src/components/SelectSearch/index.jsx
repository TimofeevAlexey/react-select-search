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

        const items = this.helperSortByName(props.items);

        this.state={
            value:"",
            searchValue:"",
            defaultItems:items,
            filteredItems:items,
            placeholder:props.placeholder,
            isDropdownOpen:false,
            isDurationTop:false,
            dropdownMaxHeight:235
        }
    }
    static getDerivedStateFromProps(props, state){

       if(props.items !== state.defaultItems){
           return{
               ...state,
               defaultItems:this.helperSortByName(props.items)
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
            isDropdownOpen:true,
            value:"",
            isDurationTop: this.helperGetDuration()
        },()=> this.searchInput.focus());
    }
    handleOnChangeSearch(e){
        const value = e.target.value;

        let filteredItems = this.state.defaultItems.filter((f)=>{
            return (f.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        })

        this.setState({
            searchValue:value,
            filteredItems:filteredItems,
            value:""
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
    handleSelectChange(value){
        this.setState({
            value,

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
    helperSortByName(arr){

        let result = arr.sort((a,b)=>{
            if(a.name < b.name)
                return -1
            if(a.name > b.name)
                return 1
            return 0
        })

        return result
    }
    helperGetDuration(){

        const bounding = this.mainElement.getBoundingClientRect()

        const clientHeight = document.body.clientHeight;

        console.log("clientHeight",clientHeight);
        console.log("clientHeight - bounding.bottom",clientHeight - bounding.bottom);
        console.log("this.state.maxHeight",this.state.maxHeight);


        if(
            (clientHeight - bounding.bottom) < this.state.dropdownMaxHeight
            &&
            bounding.top > this.state.dropdownMaxHeight
        ){
            return true
        }

        return false
    }

    render() {
        return (
            <div className="SelectSearch" ref={(div)=>this.mainElement = div}>
                {
                   this.helperIsMobile()?
                        <select
                            className="SelectSearch__select"
                            ref={(select)=>this.select = select}
                            value={this.state.value}
                            onChange={(e)=>this.handleSelectChange(e.target.value)}
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
                            "SelectSearch__box_open":this.state.isDropdownOpen,
                            "SelectSearch__box_open_up":this.state.isDropdownOpen && this.state.isDurationTop,
                            "SelectSearch__box_open_down":this.state.isDropdownOpen &&!this.state.isDurationTop,
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
                    <div className={
                        classNames({
                            "SelectSearch__placeholder":true,
                            "SelectSearch__placeholder_rolled-up":(
                                (this.state.isDropdownOpen || this.state.value.length !== 0)
                            ),
                            "SelectSearch__placeholder_hide":(
                                this.state.isDropdownOpen
                                &&
                                this.state.isDurationTop
                            )
                        })
                    }>
                        {this.state.placeholder}
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
                        <div
                            className={
                                classNames({
                                    "dropdown SelectSearch__dropdown":true,
                                    "dropdown_up":this.state.isDurationTop,
                                    "dropdown_down":!this.state.isDurationTop,
                                })
                            }
                            style={{
                                maxHeight: this.state.dropdownMaxHeight
                            }}
                        >
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
    ),
    placeholder:PropTypes.string
};
SelectSearch.defaultProps = {
    items:[],
    placeholder:"Выберите"
};


export default enhanceWithClickOutside(SelectSearch);
