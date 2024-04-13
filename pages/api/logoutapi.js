import Cookies from 'cookies'

export default async function handle(req, res) {
    const cookies = new Cookies(req, res)
    const tokenCookie = cookies.get('token')
    if (tokenCookie) {
        cookies.set('token', null, { expires: new Date(0) })
        res.status(200).send({ message: "Logout successfully" })
    }
    else{
        res.status(200).send({message: "No user connected"})
    }
}