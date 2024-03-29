import { useFieldArray, useForm } from 'react-hook-form';
import s from './PriceBlockForm.module.css';
import { ReactComponent as IconClose } from './../../../assets/icons/close.svg';
import { ReactComponent as IconCross } from './../../../assets/icons/cross.svg';
import {  savePricelistData } from '../../../redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';
import smallPreloader from './../../../assets/preloaderSmall.svg';
const PriceBlockForm = (props) => {
    const isFetchingStatus = useSelector(state => state.profilePage.isFetchingForm);
    const   profilePricing  =   useSelector(state => state.profilePage.profile.pricing );

    let initialValues = {pricing: profilePricing};
 
    const { register, reset, handleSubmit, control, clearErrors, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues : initialValues});

    const { fields, append, remove } = useFieldArray({control, name: "pricing", keyName: "id",});

    const handleAddInput = () => {
        append({  title: '', price: ''});
    };

    const handleRemoveInput = (index) => {
        remove(index);
    }

    const dispatch = useDispatch();

    const submit  = data => {
       const updatedData = data.pricing.map((item, index) => {
            item.id = index + 1;
            return item;
             });
        dispatch(savePricelistData(updatedData)).then(() => {
                if (isFetchingStatus) {           
                    props.setModalPriceActive(false);
                    clearErrors();
                    reset({defaultValues: initialValues});
                }
            })
    }
     
 

    return (<div className={s.modal}>
        <div className={s.modalTitle}><span>Прайс-лист</span> <IconClose onClick={() => { props.setModalPriceActive(false) }} className={s.icon} /> </div>
        <form autoComplete='off' id='editPrice' onSubmit={handleSubmit(submit )} className={s.form} >
            <div className={s.services}>
              {fields.map((field, index) =>(
               
              <div className={s.formItemContainer} key={field.id}> 
              {fields.length > 1 &&  <IconClose onClick={() => {handleRemoveInput(index)}} className={s.icon} />}
              <div className={s.formItem}>
                <div className={s.formSubItem}>
                    <input  className={errors?.pricing && errors?.pricing[index]?.title?.type === "required" ? s.error : s.input} name={`title[${index}]`} 
                {...register(`pricing[${index}].title`,  {required: true, maxLength: 100 })} placeholder='Услуга' type="text" defaultValue={field.title} />
                {errors?.pricing && errors?.pricing[index]?.title?.type === "required" && <span className={s.errorSpan}>Поле обязательно к заполнению</span>}
                </div>
                <div className={s.formSubItem}>
                <input className={errors?.pricing && errors?.pricing[index]?.price?.type === "required"  ? s.error : s.input} name={`price[${index}]`} 
                {...register(`pricing[${index}].price`,  {required: true, maxLength: 100 })}  placeholder='Стоимость' type="text" defaultValue={field.price} />
                 {errors?.pricing && errors?.pricing[index]?.price?.type === "required" && <span className={s.errorSpan}>Поле обязательно к заполнению</span>}
                 </div>
              </div>
            </div> ))}
          
            </div>
            <div onClick={handleAddInput} className={s.addInput}> <IconCross className={s.icon} /> Еще услуга </div>
        </form>
   
    
        <button type='submit' disabled={isFetchingStatus} form='editPrice' className={s.button}>{isFetchingStatus ?   <img src={smallPreloader} alt="" /> : "Сохранить"  }</button>
    </div>)
}


export default PriceBlockForm;








// {inputDefaultData.map((item, index) => (<div key={item.id} className={s.formItemContainer}>
//     <IconClose onClick={() => { handleRemoveDefaultInput(index) }} className={s.icon} />
 
//     <div className={s.formItem}>
//         <input className={s.input} name={`title`} {...register(`title${index + 1}`)} placeholder='Услуга' type="text" defaultValue={item[`title${index + 1}`]} />
//         <input className={s.input} name={`price`} {...register(`price${index + 1}`)}  placeholder='Стоимость' type="text" defaultValue={item[`price${index + 1}`]} />

//     </div>
// </div>
// ))}
// {inputData.map((item, index) => (<div className={s.formItemContainer}>
//     <IconClose onClick={() => { handleRemoveInput(index) }} className={s.icon} />
//     <div className={s.formItem}>
//     <input className={s.input} name={`title`} {...register(`title${inputDefaultData.length + 1}`)} placeholder='Услуга' type="text"   />
//     <input className={s.input} name={`price`} {...register(`price${inputDefaultData.length +1}`)}  placeholder='Стоимость' type="text"   />

//     </div>
// </div>
// ))
// }

    // const handleRemoveInput = (index) => {
    //     console.log(index);
    //     const updatedData = inputData.filter((item, i) => i !== index);
    //     setInputData(updatedData);
    //     console.log(inputData);

    // };

    // const handleRemoveDefaultInput = (index) => {
    //     if (inputData.length > 0 || inputDefaultData.length > 1) {
    //         console.log(index);
    //         const updatedData = inputDefaultData.filter((item, i) => i !== index);
    //         setInputDefaultData(updatedData);
    //         console.log(inputDefaultData);
    //         console.log(inputData);
    //     }
    // };



     //     const obj = data;
    //     const convertObjectToArray = (obj) => {
    //          const arr = []; let id = 1; 
    //         // Проходим по ключам объекта 
    //         for (const key in obj) 
    //         { // Проверяем, является ли ключ ключом для заголовка 
    //             if (key.includes("title")) 
    //             { const titleKey = key; 
    //                 const priceKey = key.replace("title", "price"); 
    //                 // Создаем новый объект с заданным id, заголовком и ценой 
    //                 const newObj = { id: id, [titleKey]: obj[key], [priceKey]: obj[priceKey] }; 
    //                 // Добавляем объект в массив 
    //                 arr.push(newObj); id++; } 
    //             } 
    //             return arr; 
    //         }; 
    //         const newPricing = convertObjectToArray(obj);
    //     console.log(data);
    //     console.log(pricing);
        
    // dispatch(savePriceData(newPricing));
    // console.log(pricing);
    // props.setModalPriceActive(false);
    //  reset();



       
       
        
        // const updatedPricing = [...pricing, { ...data }];
        
        // dispatch(savePriceData(updatedPricing));
        // props.setModalPriceActive(false);
        // console.log(pricing);
        // reset();
//           dispatch(savePriceData(updatedPricing));
//   setInputDefaultData(updatedPricing);
//   props.setModalPriceActive(false);
//   reset();
        
        // console.log(data);
        // const updatedPricing = [{ ...data }];
        // console.log(updatedPricing);
        // console.log(data);
        // dispatch(savePriceData(updatedPricing));
        // setInputDefaultData(updatedPricing);
        // props.setModalPriceActive(false);
        // reset();
    // }