import Form from "./Form"
const Create = () =>{
    const customer = {
        name:'',
        phone:'',
        status:''
    }
    return (
        <Form customer = {customer}/>
    )
}
export default Create