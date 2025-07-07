import { useEffect, useState } from "react";


export function Toast({text, action}:{text:string, action:boolean}){
  const [isActionInProgress, setAction] = useState(action);
  useEffect(()=>{
    if(isActionInProgress){
      setTimeout(()=>{
        setAction((action)=>!action)
      }, 1000);
    }
  }, [isActionInProgress])

  return (
    <>
      {action &&    
      <div className="toast toast-center toast-middle">
        <div className="alert alert-info">
          <span>{text}</span>
        </div>
      </div>
      }
    </>
  )
}