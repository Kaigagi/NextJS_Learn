import Link from "next/link"

async function getMembers() {
    const res = await fetch("http://localhost:4000/members", {
        cache: "no-store"
    })

    return res.json()
}

export default async function MembersPage() {
    const members = await getMembers()

    return (
        <main>
            <h2>Members</h2>

            {members.map((member) => (
                <div key={member.id} className="card">
                    <Link href={`/members/${member.name}`}>
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </Link>
                </div>
            ))}
        </main>
    )
}