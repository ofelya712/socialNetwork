import { useEffect, useState } from "react"
import { getAllfollowings } from "../../../helpers/api"
import { IUser } from "../../../helpers/types"
import { BASE, DEF } from "../../../helpers/default"

export const Following = () => {
    const [following, setFollowing] = useState<IUser[]>([])

    useEffect(() => {
        getAllfollowings()
            .then(res => {
               setFollowing(res.payload as IUser[])
            })
    }, [])




    return <>
    {following.map(elm=><div className="followers" key={elm.id}>
        <img className="req-pic" src={elm.picture ? BASE + elm.picture : DEF} />
                <p>{elm.name} {elm.surname}</p>
    </div>)}

    </>
}