import React, {useState, useReducer} from "react";
import './App.css';

function App() {

  const initialState = [{
    id: Date.now(),
    name: "Suhas Bhairav",
    email: "test@test.com"
  }];

  function reducer(state, action){
    console.log(state, action);
    switch(action.type){
      case "add":
        return [action.payload, ...initialState, ];

      case "remove":
        return state.filter(student => {
          return student.id !== action.payload.id;
        });

      // eslint-disable-next-line no-fallthrough
      default:
        throw new Error("Invalid!!");
    };
  };


  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  //Add a student
  //remove a student

  const addStudent = (e) => {
    e.preventDefault();

    const student = {
      id: Date.now(),
      name,
      email
    };

    setName('');
    setEmail('');
    dispatch({
      type: "add",
      payload: student
    });

  };

  return (
    <div className="App">
      <div>
        <h1>Reducers</h1>

        <form onSubmit={addStudent}>          
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">Add Student</button>         
        </form>

        <ul>
          {state.map((student) => {
            return (<li key={student.id}>
              <div>
                {student.name} --- {student.email}
                <button onClick={() => dispatch({type: "remove", payload: {id: student.id} } )}>Remove</button>
              </div>
            </li>
          );})}
        </ul>

      </div>
    </div>
  );
}

export default App;
