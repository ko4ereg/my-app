import { useState } from 'react';
import s from './Masters.module.css';


const Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let  portionSize = 10;

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div>
        {portionNumber > 1 && <button onClick={() => { setPortionNumber(1); props.onPageChanged(1); props.currentPage = 1}}>First</button>}
        {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1); props.onPageChanged(leftPortionPageNumber - 10); props.currentPage = leftPortionPageNumber - 10 }} > Previous </button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
            return <span className={props.currentPage === p ? s.selectedPage : ''}
                key={p} onClick={() => { props.onPageChanged(p) }}> {p} </span>
        })}
        {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1); props.onPageChanged(rightPortionPageNumber + 1); props.currentPage = rightPortionPageNumber + 1 }}> Next </button>}
    </div>
}

export default Paginator;
// import s from './Users.module.css';

// const Paginator = ({ portionSize = 10, totalUsersCount, pageSize, currentPage = 1, onPageChanged }) => {

//     let pagesCount = Math.ceil(totalUsersCount / pageSize);


//     let pages = [];
//     for (let i = 1; i <= pagesCount; i++) {
//         pages.push(i);
//     }

//     let portionCount = Math.ceil(pagesCount / portionSize);
//     let [portionNumber, setPortionNumber] = useState(1);
//     let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
//     let rightPortionPageNumber = portionNumber * portionSize;

//     return <div>
//         {portionNumber > 1 && <button onClick={() => { setPortionNumber(1); onPageChanged(1); currentPage = 1}}>First</button>}
//         {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1); onPageChanged(leftPortionPageNumber - 10); currentPage = leftPortionPageNumber - 10 }} > Previous </button>}
//         {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
//             return <span className={currentPage === p ? s.selectedPage : ''}
//                 key={p} onClick={() => { onPageChanged(p) }}> {p} </span>
//         })}
//         {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1); onPageChanged(rightPortionPageNumber + 1); currentPage = rightPortionPageNumber + 1 }}> Next </button>}
//     </div>
// }

// export default Paginator;

 