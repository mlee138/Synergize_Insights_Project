import React from 'react';
import './stylesheets/App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      name: '',
      email: '',
      zip: '',
      age: '',
      checked: [],
      radio: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount = () =>{
    var myForm = document.getElementsByTagName("form")[0];
    //add submit event listener to form
    myForm.addEventListener("submit", function(evt) {
      if(myForm.checkValidity() === false){
        evt.preventDefault();
        alert("Form is invalid");
        return false;
      } else {
        evt.preventDefault();
        alert("Form is valid");
        return false;
      }
    });
  }

  handleChange = (event) => {
     var name = event.target.id;
     var value = event.target.value;

     this.setState({ [name]: value});
  }

  submitForm = (event) => {
    var errors = [];
    // check if empty: name, email, zip, age
    if(!this.state.name){ errors.push("name");}
    if(!this.state.email){ errors.push("email");}
    if(!this.state.zip){ errors.push("zip");}
    if(!this.state.age){ errors.push("age");}

    //at least one Checkbox is filled
    var checkboxQuestion = document.getElementById("checkbox");
    var checkboxes = checkboxQuestion.getElementsByTagName('input');
    var checkboxFilled = false;
    for(let i=0; i < checkboxes.length; i++){
      if(checkboxes[i].checked){ 
        checkboxFilled = true; 
        this.setState({ checked: [...this.state.checked, checkboxes[i].id]});
        break; 
      }
    }
    
    //check one radio is checked
    var radioQuestion = document.getElementById("radio");
    var radios = radioQuestion.getElementsByTagName("input");
    var radioChecked = false;
    for (let i=0; i < radios.length; i++){
      if(radios[i].checked){ 
        radioChecked = true;
        this.setState({ radio: radios[i].id });
        break;
      }
    }

    //checkbox and or radio was not filled
    if(!checkboxFilled){ 
      errors.push("How did you hear about us?"); 
    }
    if(!radioChecked){ 
      errors.push("Who is your favorite employee?"); 
    }

    if(errors.length > 0){
      //at least one error found
      var errorStr = errors.toString().replace(/,/g, "\n");
      alert("The following areas haven't been filled out: \n" + errorStr);
      var status = document.getElementById("status");
      status.innerHTML = errorStr;

      event.preventDefault();
    }
  }

  render(){
    return (
      <div className="App">
        <form>
          <h2>Sign up today!</h2>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input 
              type="name"
              id="name"
              placeholder="Ex: Matt Lee"
              onChange={this.handleChange} 
              required/>
          </fieldset>
         
          <fieldset>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="email@example.com"
              onChange={this.handleChange}
              required/>
          </fieldset>

          <fieldset>
            <label htmlFor="zip">Zip code</label>
            <input 
              type="text" 
              id="zip"
              placeholder="Ex: 12345"
              pattern="^\d{5}(?:[-\s]\d{4})?$"  
              onChange={this.handleChange}
              required/>        
          </fieldset>

          <fieldset>
            <label htmlFor="age">Age</label>
            <select id="age" onChange={this.handleChange} required>
              <option/>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25+</option>
            </select>
          </fieldset>

          <fieldset id="checkbox">
            <span>How did you hear about us?</span>
            <br/>
            <input id="twitter" type="checkbox" name="option1"/>
            <label htmlFor="twitter">Twitter</label>
            <br/>
            <input id="blog" type="checkbox" name="option2"/>
            <label htmlFor="blog">Blog</label>
            <br/>
            <input id="linkedin" type="checkbox" name="option3"/>
            <label htmlFor="linkedin">LinkedIn</label>
            <br/>
            <input id="wordOfMouth" type="checkbox" name="option4"/>
            <label htmlFor="wordOfMouth">Word of Mouth</label>
          </fieldset>

          <fieldset id="radio">
            <span>Who is your favorite employee?</span>
            <br/>
            <input id="tiasia" type="radio" name="favorite"/>
            <label htmlFor="tiasia">Tiasia</label>
            <br/>
            <input id="jerry" type="radio" name="favorite"/>
            <label htmlFor="jerry">Jerry</label>
          </fieldset>
          <input type="submit" onClick={this.submitForm}/>
          <p id="status"></p>
        </form>
      </div>
    );
  }
  
}

export default App;
