import { notFound } from "next/navigation"

export const dynamicParams = true // default val = true

async function getMember(name) {
    const res = await fetch(`http://localhost:4000/members?name=${name}`)

    const data = await res.json()
    return data[0]
}

export async function generateStaticParams() {
    const res = await fetch("http://localhost:4000/members")
    const members = await res.json()

    return members.map((member) => ({
        name: member.name
    }))
}

export default async function MemberDetails(props) {
    const params = await props.params;
    console.log("name: ",params.name)
    const member = await getMember(params.name)
    console.log("member: ",member)

    if (!member) {
        notFound()
    }

    return (
        <main>
            <h2>{member.name}</h2>
            <p>Role: {member.role}</p>
            <p>ID: {member.id}</p>
        </main>
    )
}