import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Link} from 'react-router'



const CreatePartner= () => {
    useEffect(()=> {document.title = 'Создать нового партнера'}, [])
    const [partner, setPartner] = useState({})

    const submitHandler = async (e) => {

      e.preventDefault()
      const createdPartner = {
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
      await window.api.createPartner(createdPartner)
      setPartner(createdPartner)
      document.querySelector('form').reset()
    }

  

return (
  <div className='container'>
    <Link to={'/'}><button> НАЗАД</button></Link>
    
    <form action="" onSubmit={(e)=>submitHandler(e)}>
    <label htmlFor="name">Наименование:</label>
      <input id="name" type="text" required/>
      <label htmlFor="type">Тип партнера:</label>
      <select name="" id="type" required >
        <option value="ЗАО">ЗАО</option>
        <option value="ООО">ООО</option>
        <option value="ОАО">ОАО</option>
        <option value="ПАО">ПАО</option>
      </select>
      <label htmlFor="rating">Рейтинг:</label>
      <input id="rating" type="number" step="1" min='0' max='100' required />
      <label htmlFor="address">Адрес:</label>
      <textarea id="address" type="text" required />
      <label htmlFor="director">ФИО директора:</label>
      <input id="director" type="text" required  />
      <label htmlFor="phone">Телефон:</label>
      <input id="phone" type="tel" required  />
      <label htmlFor="email">Email компании:</label>
      <input id="email" type="email" required />
      <label htmlFor="tax_number">ИНН:</label>
      <input id="tax_number" type="text" required />
      <button type="submit">Создать партнера</button>
    </form>
  </div>
)
}

export default CreatePartner;