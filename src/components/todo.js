import React,{useState,useEffect} from 'react'
import './styles.css'
const getLocalData =()=>{
  const list = localStorage.getItem("mytodolist")
  if(list){
    return JSON.parse(list)
  }
  else{
    return []
  }
}

const Todo = () => {
    const [inputItem,setInputItem] = useState("");
    const [item,setItem] = useState(getLocalData());
    const [edito,setedito] = useState("");
    const [toggleButton,setToggleButton] = useState(false);
    const adding = () =>{
        if(!inputItem){
            alert("please fill the item")
        }
        else if(inputItem && toggleButton){
          setItem(
            item.map((curEle)=>{
              if(curEle.id===edito){
                return {...curEle,name:inputItem}
              }
              return curEle;
            })
          )
          setInputItem("");
          setedito("");
          setToggleButton(false);
        }
        else{
          const newInputData = {
            id: new Date().getTime().toString(), // Fixed method call
            name: inputItem,
        };
            setItem([...item,newInputData])
            setInputItem("");

        }

    }
    const deleting = (index) =>{
      const updatedItem = item.filter((curEle)=>{
        return curEle.id!==index

      })
      setItem(updatedItem)


    }
    const editing =(index)=>{
      const edited = item.find((curEle)=>{
        return curEle.id===index
      })
      setedito(edited.id); 
      setInputItem(edited.name); 
      setToggleButton(true);

    }
    const removeA =()=>{
      return setItem([]);
    }
    useEffect(()=>{
      localStorage.setItem("mytodolist",JSON.stringify(item))
    },[item])


    


  return (
    <>
      <div className='main-div'>
      <div className='child-div'>
      <figure>
        <img src='./images/logo.png' alt='to-do logo'></img>
        <figcaption>ADD YOUR WORK</figcaption>
      </figure>
      <div className='addItems'>
      <input type='text' placeholder='✍️ add here...' className='form-control' value={inputItem} onChange={(e)=>setInputItem(e.target.value)}>

      </input>
      {toggleButton?<button onClick={adding}>Edit</button>:<button onClick={adding}>+</button>}
     
      
      


      </div>
      <div className='showItems'>
      {item.map((curEle)=>{
        return (
            <div className='eachitems' key={curEle.id}> 
      <h3>{curEle.name}</h3>
      <div className='todo-btn'>
        <button className='add-edit' onClick={()=>editing(curEle.id)}>✍️</button>
        <button className='add-remove' onClick={()=>deleting(curEle.id)}>⛔</button>
      </div>

      </div>

        )
      })}
      

      </div>
      <div className='showItems'>
      <button className='btn effect04 ' data-sm-link-text="Remove" onClick={removeA}>
        <span>Reset</span>
      </button>

      </div>

      </div>

      </div>
    </>
  )
}

export default Todo
