

import { prisma } from "@/index";
import P2Plist from "../../../components/P2Plist";

async function list(){
   
    const Users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            number : true,
            email : true,
        },
    })
    const AllUser = Users.map((user:any) => {
        return {
            id: user.id,
            name: user.name,
            number: user.number,
            email: user.email,
        }
    })
    return AllUser;
}

export default async function() {
    const Alluser = await list();
    return <div className="w-full">
        <P2Plist Alluser={Alluser}></P2Plist>
    </div>
}