import Form from "./Form";

const Create = () => {
    const employee = {
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        dateLeave: '',
        dateBeginJob: '',
        typeEducation: 0,
        cccdBack: '',
        cccdFront: '',
        roleId: 0,
        id:0,
        point: 0,
        avatar: '',
        note:'',
        bankId: 0,
        status:0,
        bankFullname: '',
        bankNo: '',
        baseSalary: 0,
        shiftId:0,
        publicAvatar: '',
        publicCccdFront: '',
        publicCccdBack: ''

    };
    return (
        <Form employee={employee} />
    );
}
export default Create;