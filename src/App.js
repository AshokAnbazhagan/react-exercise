import React, { Component } from 'react';
import Group from './Images/group.svg';
import adult from './Images/adult.svg';
import room from './Images/rooms.svg';
import children from './Images/children.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCount: 1, adultCount: 1, childrenCount: 0,
    };
    this.roomincrementCall = this.roomincrementCall.bind(this);
    this.roomdecrementCall = this.roomdecrementCall.bind(this);
    this.adultincrementCall = this.adultincrementCall.bind(this);
    this.adultdecrementCall = this.adultdecrementCall.bind(this);
    this.childrenincrementCall = this.childrenincrementCall.bind(this);
    this.childrendecrementCall = this.childrendecrementCall.bind(this);
  }
  roomincrementCall() {
    this.setState({ roomCount: this.state.roomCount + 1 }, function () {
      if (this.state.roomCount > this.state.adultCount) {
        this.setState({ adultCount: this.state.adultCount + 1 });
      }
    });
  }
  roomdecrementCall() {
    var childCount, val;
    this.setState({ roomCount: this.state.roomCount - 1 }, function () {
      if (this.state.adultCount + this.state.childrenCount > this.state.roomCount * 4) {
        if (this.state.childrenCount <= 4) {
          childCount = this.state.childrenCount - this.state.childrenCount;
          if (this.state.adultCount - (this.state.roomCount * 4) >= 4) {
            val = 4 - this.state.childrenCount;
          }
          else {
            val = this.state.adultCount - this.state.roomCount * 4;
          }
        } else {
          childCount = this.state.childrenCount - ((this.state.roomCount * 4) - this.state.adultCount);
          childCount = this.state.childrenCount - childCount;
          val = 0;
        }
        this.setState({ adultCount: this.state.adultCount - val, childrenCount: childCount });
      }
    });
  }
  adultincrementCall() {
    if (this.state.adultCount + this.state.childrenCount < 20) {
      this.setState({ adultCount: this.state.adultCount + 1 }, function () {
        if (this.state.adultCount + this.state.childrenCount > this.state.roomCount * 4) {
          this.setState({ roomCount: this.state.roomCount + 1 });
        }
      });
    }
  }
  adultdecrementCall() {
    if (this.state.adultCount>this.state.roomCount) {
      this.setState({ adultCount: this.state.adultCount - 1 }, function () {
        if (this.state.adultCount + this.state.childrenCount > this.state.roomCount * 4) {
          this.setState({ roomCount: this.state.roomCount - 1 });
        }
      });
    }
    else if(this.state.adultCount === this.state.roomCount){
      if(this.state.adultCount-1+this.state.childrenCount <= ((this.state.roomCount - 1) * 4)){
        this.setState({adultCount:this.state.adultCount-1,roomCount:this.state.roomCount-1});
      }
    }
  }
  childrenincrementCall() {
    if (this.state.roomCount * 4 > this.state.adultCount + this.state.childrenCount)
      this.setState({ childrenCount: this.state.childrenCount + 1 });
  }
  childrendecrementCall() {
    this.setState({ childrenCount: this.state.childrenCount - 1 }, function () {
      if (this.state.adultCount + this.state.childrenCount <= ((this.state.roomCount - 1) * 4)) {
        this.setState({ roomCount: this.state.roomCount - 1 });
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className='pt_title_div'>
          <img src={Group} className='grp_img' />
          <p className='pt_title'>Choose number of <strong>people</strong></p>
        </div>
        <div className='pt_layout'>
          <div className='pt_list_div'>
            <img src={room} className='grp_img' />
            <p className='pt_list_title'>Rooms</p>
            <div className='pt_btn_div'>
              <button className='pt_dec_btn' onClick={this.roomdecrementCall} disabled={this.state.roomCount === 1 ? true : false}>-</button>
              <input type="text" value={this.state.roomCount} className='pt_text' readOnly />
              <button className='pt_inc_btn' onClick={this.roomincrementCall} disabled={this.state.roomCount === 5 ? true : false}>+</button>
            </div>
          </div>
          <div className='pt_list_div'>
            <img src={adult} className='grp_img' />
            <p className='pt_list_title'>Adults</p>
            <div className='pt_btn_div'>
              <button className='pt_dec_btn' onClick={this.adultdecrementCall} disabled={this.state.adultCount === 1 ? true : false}>-</button>
              <input type="text" value={this.state.adultCount} className='pt_text' readOnly />
              <button className='pt_inc_btn' onClick={this.adultincrementCall}>+</button>
            </div>
          </div>
          <div className='pt_list_div' style={{ border: 'none' }}>
            <img src={children} className='grp_img' />
            <p className='pt_list_title'>Children</p>
            <div className='pt_btn_div'>
              <button className='pt_dec_btn' onClick={this.childrendecrementCall} disabled={this.state.childrenCount === 0 ? true : false}>-</button>
              <input type="text" value={this.state.childrenCount} className='pt_text' readOnly />
              <button className='pt_inc_btn' onClick={this.childrenincrementCall}>+</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
