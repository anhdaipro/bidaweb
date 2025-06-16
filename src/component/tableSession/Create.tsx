
import FormTableSession from '@component/tableSession/Form';
export default function CreateTableSession() {
  const tableSession = {
    startTime: '',
    tableId:'',
    endTime: '',
    playerName: '', // hoặc playerId nếu liên kết User
    phone: '',//số điện thoại khách
    employeeId:'',
    paymentMethod:'',
    note:'',
    discountAmount:0,
    status:'',
    orders:[],
  }
  
  return (
    <FormTableSession tableSession ={tableSession}/>
  );
}
