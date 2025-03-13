import axios from "axios"

describe("Testes com tabela Person sem autentificação", () => {

    test("Deve adicionar e selecionar uma pessoa", async () => {
        const person = {
            name: "Darton",
            type: "PF",
            password: "cofe"
        }

        const postResponse = await axios.post("http://localhost:3000/person", person)
        expect(postResponse.status).toBe(200)

        const getResponse = await axios.get(`http://localhost:3000/person/${postResponse.data.id}`)
        expect({
            status: getResponse.status,
            id: getResponse.data.id
        }).toEqual(expect.objectContaining({
            status: 200,
            id: postResponse.data.id
        }))
    })

    test("Deve obter todos os usuários", async () => {
        const getResponses = await axios.get("http://localhost:3000/person")
        expect(getResponses.status).toBe(200)
    })
})

describe("Testes com tabela Person com autentificação", () => {
    let token: string
    let postResponse: any

    beforeEach(async () => {
        const person = {
            name: "Moises",
            type: "PF",
            password: "zete"
        }

        postResponse = await axios.post("http://localhost:3000/person", person)
        expect(postResponse.status).toBe(200)

        const authResponse = await axios.post("http://localhost:3000/auth/person", {
            "id": postResponse.data.id,
            "password": "zete"
        })
        expect(authResponse.status).toBe(200)
        token = authResponse.data.token
    })

    test("Deve editar uma pessoa", async () => {
        const putResponse = await axios.put("http://localhost:3000/person",
            {
                name: "Moises",
                type: "PJ",
                password: "zete"
            },

            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        expect(putResponse.status).toBe(200)
    })

    test("Deve mudar a senha de uma pessoa", async () => {
        const patchResponse = await axios.patch(`http://localhost:3000/person-password/${postResponse.data.id}`,
            {
                oldPassword: "zete", newPassword: "chim"
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

        expect(patchResponse.status).toBe(200)
    })

    test("Deve deletar uma pessoa", async () => {
        const deleteResponse = await axios.delete("http://localhost:3000/person", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        expect(deleteResponse.status).toBe(200)

    })
})