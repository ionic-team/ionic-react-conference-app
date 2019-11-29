import React from "react";
import app from "./../Flamelink";
import firebase from "firebase";

function App() {
  const [persons, setPersons] = React.useState([]);
  const turtles = [
    {
      name: "Leonardo",
      nickName: "Leo",
      weapon: "Katana",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
    },
    {
      name: "Donatello",
      nickName: "Don",
      weapon: "Bo staff",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/5/5a/Donatello_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
    },
    {
      name: "Michelangelo",
      nickName: "Mikey",
      weapon: "Nunchucks",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/f/f3/Michelangelo_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
    },
    {
      name: "Raphael",
      nickName: "Raph",
      weapon: "Sai",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/7/72/Raphael_%28Teenage_Mutant_Ninja_Tutles%29.jpg"
    }
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      const persons = await app.content.get({ schemaKey: "persons" });
      setPersons(persons.fbX44TMuATdWZGblxkvK);
    };
    fetchData();
  }, []);
  console.log(persons);
  console.log(turtles);

  const displayTurtles = persons.map((turtle, index) => (
    <div>
      <h1>{turtle.date}</h1>
    </div>
  ));

  return <div>{displayTurtles}</div>;
}

export default App;
/**
    <ul>
      {spells.map(spells => (
        <li>{spells}</li>
      ))}
    </ul> */

{
  /**
   * flameluink .tsx has to be edited too.
   *
   * import React from "react";
import app from "./../Flamelink";
class Clock extends React.Component {
  async componentDidMount() {
    try {
      const products = await app.content.get({ schemaKey: "products" });
      console.log("All of your products:", products);

      console.log("HHH");

    } catch (error) {
      // handle any errors
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
  }
}
export default Clock;
 */
}
