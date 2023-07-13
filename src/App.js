import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import {useState} from 'react';

// const list=[{name:'apple', quantity:3, bought:false, id:1},
// {name:'pear', quantity:1, bought:true, id:2},
// {name:'beef', quantity:8, bought:false, id:3}]




export default App;


function App() {
  return (
    <div className="App">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}




function Body()
{
  
  const [name,setName]=useState("");
  const [quantity,setQuantity] = useState(1);
  const[items,setItems] = useState([]);
  
  function handleDeleteItem(id){
    alert("");
    alert(id);
    setItems(items=>items.filter(item=>item.id!== id))
  }
  return(
  <>
    <Form quantity={quantity} name={name} onSetName={setName} onSetQuantity={setQuantity} onSetItems={setItems} items={items}/>
    <ShoppingList items={items} onHandleDeleteItem={handleDeleteItem}/>
  </>
  );
 }

function Form({items,name,quantity,onSetName,onSetQuantity,onSetItems})
{
  function handleAddItems(item){
    onSetItems(()=>[...items,item])
  }


  function handleSubmit(e)
  {
    e.preventDefault();
    if(!name)  return;
    const newItem = {name,quantity,bought:false,id:crypto.randomUUID()}
    handleAddItems(newItem)
    onSetName("")
    onSetQuantity(1);
  }



return(
    <form onSubmit={handleSubmit}>
      <div  className="form">
      <label>Name</label>
      <input  value={name} type="text" placeholder="item.." className="input" onChange={(e)=>onSetName(e.target.value)}></input>
      <label>Quantity</label>
      <select  value={quantity}className="input" onChange={(e)=>onSetQuantity(Number(e.target.value))}>
        {Array.from({length:20},(_,i)=>i+1).map(num=><option value={num} key={num}>{num}</option>)}
      </select>
      <button>Add item</button>
      </div>
    </form>
);
}

function ShoppingList({onHandleDeleteItem,items})
{
  return(
  <div className="container">
    {items.map(item=><Item item={item} onHandleDeleteItem={onHandleDeleteItem} />)}
  </div>
  );
}

function Item({onHandleDeleteItem,item})
{
  return(
    <div className="item">
      <input type="checkbox" ></input>
      <span>{item.quantity}</span>
      <span>{item.name}</span>
      <span><button onClick={()=>onHandleDeleteItem(item.id)}>❌</button></span>
    </div>
  );
}