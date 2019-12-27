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
      checked: {
        twitter: false,
        blog: false,
        linkedin: false,
        wordOfMouth: false,
      },
      radio: '',
      status: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () =>{
    var myForm = document.getElementsByTagName("form")[0];
    //add submit event listener to form
    myForm.addEventListener("submit", this.handleSubmit);
  }

  handleChange = (event) => {
     var name = event.target.id;
     var value = event.target.value;

     this.setState({ [name]: value});
  }

  handleCheckbox = (event) => {
    var checked = this.state.checked;
    var id = event.target.id;
    checked[id] = !checked[id];
    console.log(checked);
  }

  handleRadio = (event) => {
    this.setState({ radio: event.target.id });
  }

  handleSubmit = (event) => {
    
    var errors = [];
    
    // check if any questions are empty
    if(!this.state.name){ errors.push("name");}
    if(!this.state.email){ errors.push("email");}
    if(!this.state.zip){ errors.push("zip");}
    if(!this.state.age){ errors.push("age");}

    var noneChecked = true;
    var entries = Object.entries(this.state.checked);
    var checked = [];
    for(const [key, value] of entries){
      if(value){ 
        noneChecked = false;
        checked.push(key);
      }
    }
    if(noneChecked){ errors.push("How did you hear about us?"); }
    if(!this.state.radio){ errors.push("Who is your favorite employee?"); }

    //check if any errors found
    var status = document.getElementById("message");
    if(errors.length > 0){
      //create list of errors
      var errorList = [];
      errors.forEach(function(error){
        error = "<li>" + error + "</li>"
        errorList.push(error);
      });
      var errorStr = errorList.toString().replace(/,/g, "");
      status.innerHTML = "The following questions were not answered:<br/><ul>" + errorStr + "</ul>";
      this.setState({ status: "error" });
      event.preventDefault();
    } else { //no errors found
      //reset error message
      status.innerHTML = '';
      this.setState({status: ''});

      //output results
      alert("--Submission--\nname: " + this.state.name 
            + "\nemail: " + this.state.email 
            + "\nzip: " + this.state.zip
            + "\nage: " + this.state.age
            + "\nexposure: " + checked
            + "\nfavorite employee: " + this.state.radio);
    }
  }

  render(){
    return (
      <div className="App">
        <div>
          <img src="./synergy_insights.png" alt="synergize insights"/>
          <span>Synergize Insights</span>
        </div>
        <form>
          <h1>Sign up today!</h1>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input 
              type="name"
              id="name"
              className="fill-width"
              placeholder="John Smith"
              onChange={this.handleChange} 
              required/>
          </fieldset>
         
          <fieldset>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              className="fill-width"
              placeholder="email@example.com"
              onChange={this.handleChange}
              required/>
          </fieldset>

          <fieldset>
            <label htmlFor="zip">Zip code</label>
            <input 
              type="text" 
              id="zip"
              className="fill-width"
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
            <p>How did you hear about us?</p>
            <br/>
            <label htmlFor="twitter">
              <input id="twitter" type="checkbox" name="option1" onChange={this.handleCheckbox}/>
              <span className="custom-input"/>
              Twitter
            </label>
            <br/>
            <label htmlFor="blog">
              <input id="blog" type="checkbox" name="option2" onChange={this.handleCheckbox}/>
              <span className="custom-input"/>
              Blog
            </label>
            <br/>
            <label htmlFor="linkedin">
              <input id="linkedin" type="checkbox" name="option3" onChange={this.handleCheckbox}/>
              <span className="custom-input"/>
              LinkedIn
            </label>
            <br/>
            <label htmlFor="wordOfMouth">
              <input id="wordOfMouth" type="checkbox" name="option4" onChange={this.handleCheckbox}/>
              <span className="custom-input"/>
              Word of Mouth
            </label>
          </fieldset>

          <fieldset id="radio">
            <p>Who is your favorite employee?</p>
            <br/>
            <label htmlFor="tiasia">
              <input 
                id="tiasia" 
                type="radio" 
                name="favorite"
                onChange={this.handleRadio}/>
              <span className="custom-input"/>
              Tiasia
            </label>
            <br/>
            <label htmlFor="jerry">
              <input 
                id="jerry" 
                type="radio" 
                name="favorite"
                onChange={this.handleRadio}/>
              <span className="custom-input"/>
              Jerry
            </label>
          </fieldset>
          <span id="message" className={this.state.status}></span>
          <input type="submit"/>
        </form>
      </div>
    );
  }
  
}

export default App;
