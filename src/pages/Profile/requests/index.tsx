import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { acceptRequest, declineRequest, handleRequest } from "../../../helpers/api"
import { BASE, DEF } from "../../../helpers/default"
import { Link } from "react-router-dom"


export const Requests = () => {
    const [requests, setRequests] = useState<IUser[]>([])
    useEffect(() => {
        handleRequest()
            .then(response => {
                setRequests(response.payload as IUser[])
            })

    }, [])

    const handleAccept=(id:number)=>{
        acceptRequest(id)
        .then(()=>{
           setRequests(requests.filter(elm=>elm.id!==id))
        })
        
    }

    const handleDecline=(id:number)=>{
        declineRequest(id)
        .then(()=>{
            setRequests(requests.filter(elm=>elm.id!==id))
        })
    }






    return requests && <>
        <h2>You have {requests.length} requests</h2>
        {requests.map(elm => <div className="box" key={elm.id}>
            <img className="req-pic" src={elm.user?.picture ? BASE + elm.user.picture : DEF} />
            <Link style={{ color: "black" }} to={'/profile/' + elm.user?.id}>  <p>{elm.user?.name} {elm.user?.surname}</p></Link>
            <button onClick={()=>handleAccept(elm.id)} style={{ marginLeft: 130, marginBottom: 100 }} type="button" className="btn btn-outline-primary btn-rounded" data-mdb-ripple-init data-mdb-ripple-color="dark">accept</button>
            <button onClick={()=>handleDecline(elm.id)} style={{ marginLeft: 20, marginBottom: 100 }} type="button" className="btn btn-outline-secondary btn-rounded" data-mdb-ripple-init data-mdb-ripple-color="dark">decline</button>
        </div>)}
    </>

}