import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { getAllfollowers } from "../../../helpers/api"
import { BASE, DEF } from "../../../helpers/default"

export const Followers = () => {
    const [followers, setFollowers] = useState<IUser[]>([])

    useEffect(() => {
        getAllfollowers()
            .then(res => {
                setFollowers(res.payload as IUser[])
            })



    }, [])



    return <>
        <div className="container">
            {followers.map(elm => <div className="followers" key={elm.id}>
                <img className="req-pic" src={elm.picture ? BASE + elm.picture : DEF} />
                <p>{elm.name} {elm.surname}</p>
            </div>)}
        </div>
    </>
}