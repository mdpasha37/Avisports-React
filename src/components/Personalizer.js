import React, { Component } from "react";
import { RadioGroup, ReversedRadioButton } from "react-radio-buttons";

class Personalizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupation: "",
      gender: "",
      age: "",
      disabled: false,
      submitText: "Submit",
      error: ""
    };
  }
  personalizeSubmitFormData = e => {
    e.preventDefault();
    if (!this.state.occupation || !this.state.gender || !this.state.age) {
      this.setState(() => ({
        error: "Please select all the options"
      }));
    } else {
      this.setState(() => ({
        error: "",
        disabled: true,
        submitText: "Form Submitted"
      }));
      const url = "https://yaztestapp.azurewebsites.net/api/getCatRank";
      const data = {
        rank: "true",
        contextFeatures: [
          {
            occupation: this.state.occupation,
            gender: this.state.gender,
            age: this.state.age
          }
        ]
      };

      //    this.props.onSubmitResponse(data);
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log("data from form submit", data);
          this.props.onSubmitResponse(data);
        })
        .catch(console.log());
    }
  };
  onAgeChange = value => {
    const age = value;
    this.setState(() => ({ age }));
  };
  onGenderChange = value => {
    const gender = value;
    this.setState(() => ({ gender }));
  };
  onOccupationChange = value => {
    const occupation = value;
    this.setState(() => ({ occupation }));
  };

  render() {
    return (
      <div>
        <h1>Personalizer Form</h1>
        {this.state.error && (
          <h4 style={{ color: "red" }}>{this.state.error}</h4>
        )}
        <form onSubmit={this.personalizeSubmitFormData}>
          <div className="form--radiogroup">
            <h3>Age</h3>
            <RadioGroup onChange={this.onAgeChange} horizontal>
              <ReversedRadioButton value="below 30">
                Below 30
              </ReversedRadioButton>
              <ReversedRadioButton value="above 30">
                Above 30
              </ReversedRadioButton>
            </RadioGroup>
          </div>
          <div className="form--radiogroup">
            <h3>Gender</h3>
            <RadioGroup onChange={this.onGenderChange} horizontal>
              <ReversedRadioButton value="male">Male</ReversedRadioButton>
              <ReversedRadioButton value="female">Female</ReversedRadioButton>
            </RadioGroup>
          </div>
          <div className="form--radiogroup">
            <h3>Occupation</h3>
            <RadioGroup onChange={this.onOccupationChange} horizontal>
              <ReversedRadioButton value="employed">
                Employed
              </ReversedRadioButton>
              <ReversedRadioButton value="self employed">
                Self-Employed
              </ReversedRadioButton>
            </RadioGroup>
          </div>
          <div style={{ float: "left", marginRight: "64px" }}>
            <button className="perSubmit" disabled={this.state.disabled}>
              {this.state.submitText}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Personalizer;
