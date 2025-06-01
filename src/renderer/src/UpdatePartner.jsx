import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Link} from 'react-router'

const UpdatePartner= () => {
    useEffect(()=> {document.title = 'Обновить данные партнера'}, [])
    const location = useLocation()
    const [partner, setPartner] = useState(location.state.partner)

    const submitHandler = async (e) => {

      e.preventDefault()
      const updatedPartner = {
        id: partner.id,
        name: e.target.name.value,
        company_type_name: e.target.type.value,
        director: e.target.director.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        address: e.target.address.value,
        tax_number: e.target.tax_number.value,
        rating: e.target.rating.value,   
      }
      await window.api.updatePartner(updatedPartner)
      setPartner(updatedPartner)
      document.querySelector('form').reset()
      console.log(updatedPartner)
    }

return (
  <div className='container'>
    <Link to={'/'}><button> НАЗАД</button></Link>
    
    <form action="" onSubmit={(e)=>submitHandler(e)}>
    <label htmlFor="name">Наименование:</label>
      <input id="name" type="text" required defaultValue={partner.name} />
      <label htmlFor="type">Тип партнера:</label>
      <select name="" id="type" required defaultValue={partner.company_type_name} >
        <option value="ЗАО">ЗАО</option>
        <option value="ООО">ООО</option>
        <option value="ОАО">ОАО</option>
        <option value="ПАО">ПАО</option>
      </select>
      <label htmlFor="rating">Рейтинг:</label>
      <input id="rating" type="number" step="1" min='0' max='100' required defaultValue={partner.rating}/>
      <label htmlFor="address">Адрес:</label>
      <textarea id="address" type="text" required defaultValue={partner.address} />
      <label htmlFor="director">ФИО директора:</label>
      <input id="director" type="text" required defaultValue={partner.director} />
      <label htmlFor="phone">Телефон:</label>
      <input id="phone" type="tel" required defaultValue={partner.phone} />
      <label htmlFor="email">Email компании:</label>
      <input id="email" type="email" required defaultValue={partner.email}/>
      <label htmlFor="tax_number">ИНН:</label>
      <input id="tax_number" type="text" required defaultValue={partner.tax_number}/>
      <button type="submit">Обновить партнера</button>
    </form>
  </div>
)
}

export default UpdatePartner;