import s from './BlogHeader.module.css';
import arrowUp from './../../../assets/icons/up.svg';
import arrowDown from './../../../assets/icons/down.svg';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, } from '../../../redux/posts-reducer';

const BlogHeaderLenta = (props) => {
    const dropdownRef = useRef();
    const categories = useSelector(state => state.posts.categories);
    const category = useSelector(state => state.posts.category);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            props.setOpen(false);
        }
    };
    let currentPage = 1;

    const [selectedItem, setSelectedItem] = useState('Вся лента');
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleItemClick = (label) => {
        setSelectedItem(label);
    }
    const handleCategoryClick = (label) => {
        setSelectedCategory(label);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSortMyPosts = (e) => {
        setSelectedCategory('');
        dispatch(setCategory('MyPosts'));
    }
    const handleAllPosts = (e) => {
        setSelectedCategory('');
        dispatch(setCategory(null));
    }
    const handleSortCategoryPosts = (item) => {
        setSelectedItem('Вся лентa');
        dispatch(setCategory(item));

    }

    return (
        <div className={s.headerLenta}>
            {props.isAuth
                ? <div className={s.dropdownBlock}
                    ref={dropdownRef}
                    onClick={() => { props.setOpen(!props.isOpen) }}>
                    {category === 'MyPosts' ? 'Мои посты' : selectedItem}  <img className={s.arrowpic} src={props.isOpen ? arrowUp : arrowDown} alt="" />
                    {props.isOpen &&
                        <ul className={s.dropdown}>
                            
                            <li className={category  ? s.dropdownItem : s.dropdownItem + ' ' + s.disabled  }
                                onClick={() => { handleAllPosts('Вся лента'); handleItemClick('Вся лента'); }}>Вся лента</li>
                            <li className={selectedItem === 'Мои посты' || category === 'MyPosts' ? s.dropdownItem + ' ' + s.disabled : s.dropdownItem}
                                onClick={() => { handleSortMyPosts(); handleItemClick('Мои посты'); }}>Мои посты</li>
                        </ul>}
                </div>
                : <div className={category  ? s.dropdownItem : s.dropdownItem + ' ' + s.disabled }
                onClick={() => { handleAllPosts('Вся лента'); handleItemClick('Вся лента'); }}>Вся лента</div> }
            {categories.map((item, index) => <div key={index} onClick={() => { handleSortCategoryPosts(item); handleCategoryClick(item) }} className={category === item ? s.item + ' ' + s.disabled : s.item}  >{item}</div>)}

        </div>)
}

export default BlogHeaderLenta;