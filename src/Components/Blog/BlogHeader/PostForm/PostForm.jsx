import { useForm } from 'react-hook-form';
import s from './PostForm.module.css';
import { ReactComponent as IconClose } from './../../../../assets/icons/close.svg';
import { ReactComponent as Emoji } from './../../../../assets/icons/emoji.svg';
import { ReactComponent as Upload } from './../../../../assets/icons/upload.svg';
import { useDispatch, useSelector } from 'react-redux';
import smallPreloader from './../../../../assets/preloaderSmall.svg';
import { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import {   ClickAwayListener, TextareaAutosize } from '@mui/base';
import { createPost } from '../../../../redux/posts-reducer';


const PostForm = (props) => {
    const isFetchingStatus = useSelector(state => state.posts.isFetchingForm);
    const userData = useSelector(state => state.auth);
    const [valueText, setValueText] = useState('');
    const { register, reset, handleSubmit, clearErrors, formState: { errors } } = useForm({ mode: 'onChange', });
    const [showEmoji, setShowEmoji] = useState(false);
    const postsLength = useSelector(state => state.posts.posts ? state.posts.posts.length : null);
    const [valueTitle, setValueTitle] = useState('');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
 
    const handleTextareaChange = (event) => {
        clearErrors('postText');
        if (event.target.value.length <= 2001) {
            setValueText(event.target.value);
        } else {
            setValueText(valueText);
        }
    };
    const handleInputChange = (event) => {
        clearErrors('title');
        if (event.target.value.length <= 151) {
            setValueTitle(event.target.value);
        } else {
            setValueTitle(valueTitle);
        }
    };

 
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            const startPos = e.target.selectionStart;
            const endPos = e.target.selectionEnd;
            setValueText(valueText.substring(0, startPos) + '\n' + valueText.substring(endPos));
          }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const currentDate = new Date().toISOString();
            const newPost = {
                title: valueTitle,
                text: valueText.replace(/\n/g, "<br>"),
                author: userData.name,
                authorPhoto: userData.userPhoto,
                authorService: userData.services,
                authorId: userData.userId,
                id: postsLength + 1,
                likes: 0,
                likedBy: [],
                createdAt: currentDate,
                comments: [
                ]
            };
            dispatch(createPost(newPost, files)).then((response) => {
                if (response) {
                    props.setActive(false);
                    setValueText('');
                    setValueTitle('');
                    setFiles([]);
                    setPreviews([]);
                }
            })
        }
    };


    const onEmojiClick = (emojiData) => {
        const code = '0x' + emojiData.unified;
        const emoji = String.fromCodePoint(code);
        setValueText(prevInput => prevInput + emoji);
        setShowEmoji(false);

    }

    const handleClose = () => {
        props.setActive(false);
        clearErrors();
    }

    const dispatch = useDispatch();



    function handleChange(e) {
        const newFiles = Array.from(e.target.files);
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        if (newFiles.length + files.length > 4) {
            alert('Можно выбрать максимум 4 файла');
            e.target.value = null;
        }
        else {
            setFiles(files.concat(newFiles));
            setPreviews(previews.concat(newPreviews));
        }

    }

    const deleteLoadedPhoto = (index) => {
        const updatedLoadedPhotos = files.filter((file, i) => i !== index);
        const updatedPreviews = previews.filter((file, i) => i !== index);
        setPreviews(updatedPreviews);
        setFiles(updatedLoadedPhotos);
    }


    const submit = data => {
        const currentDate = new Date().toISOString();
        if (Object.keys(errors).length === 0) {
            const newPost = {
                title: valueTitle,
                text: valueText.replace(/\n/g, "<br>"),
                author: userData.name,
                authorPhoto: userData.userPhoto,
                authorService: userData.services,
                authorId: userData.userId,
                id: postsLength + 1,
                likes: 0,
                likedBy: [],
                createdAt: currentDate,
                comments: [
                ]
            };
            dispatch(createPost(newPost, files)).then((response) => {
                if (response) {
                    props.setActive(false);
                    setValueText('');
                    setValueTitle('');
                    setFiles([]);
                    setPreviews([]);
                    reset();
                }
            })

        }


    }
 

    return (<div className={s.modal}>
        <div>
            
            <div className={s.modalTitle}><span>Новый пост</span> <IconClose onClick={handleClose} className={s.icon} /> </div>
            <form onKeyDown={handleKeyPress} autoComplete='off' id='createPost' onSubmit={handleSubmit(submit)} className={s.form} >
                <div className={s.formItem} >
                    <input value={valueTitle}
                        name='title'
                        autoComplete="off"
                        className={errors?.title ? s.error : s.input}
                        placeholder='Заголовок' type="text"
                        {...register('title', {
                            maxLength: {
                                value: 150,
                                message: 'максимум 150 символов'
                            }, onChange: (e) => { handleInputChange(e) }
                        })}
                        aria-invalid={errors.title ? true : false} /></div>
                {errors?.title && errors?.title.type === "maxLength" && (<span className={s.errorSpan}>{errors.title.message}</span>)}
                <div className={s.formItem} >
                    <TextareaAutosize

                        value={valueText}
                        name='postText'
                        className={errors?.postText && errors?.postText.type === "required" ? s.error : s.input}
                        placeholder='Чем поделимся?'
                        {...register('postText', {
                            required: 'Заполните поле, все с нетерпением ждут ваш пост!', maxLength: {
                                value: 2000,
                                message: 'максимум 2000 символов'
                            }, onChange: (e) => { handleTextareaChange(e) }
                        })}
                        aria-invalid={errors.postText ? true : false} />
                </div>
                {errors?.postText && errors?.postText.type === "required" && <span className={s.errorSpan}>{errors.postText.message}</span>}
                {errors?.postText && errors?.postText.type === "maxLength" && (<span className={s.errorSpan}>{errors.postText.message}</span>)}
                <div className={s.preview}>
                    {previews ? previews.map((item, index) => <div key={index} className={s.previewItem}> <div className={s.deleteIcon}><IconClose onClick={() => deleteLoadedPhoto(index)} className={s.icon} /></div>    <img src={item} /> </div>) : null}
                </div>
                <div className={s.buttons} >
                    <label className={files.length < 4 ? s.label : s.labelDisabled} htmlFor="photoUploader"> <Upload /></label>
                    <input

                        onChange={handleChange}
                        className={s.photoUploader} id='photoUploader' multiple type="file" />
                    <Emoji className={s.emojiIcon} onClick={(e) => { e.preventDefault(); setShowEmoji(!showEmoji) }} />
                   
                     {showEmoji &&
                        <ClickAwayListener onClickAway={() => setShowEmoji(false)}>
                            <div className={s.emojiContainer}>
                                <EmojiPicker
                                    className={s.emojipicker}
                                    searchDisabled={true}
                                    width='350px'
                                    height='250px'
                                    onEmojiClick={onEmojiClick}
                                    categories={[
                                        {
                                            category: "smileys_people",
                                            name: "Faces",
                                        },
                                    ]}
                                    // style={{
                                    //     position: 'absolute',
                                    //     bottom: '0',
                                    //     left: '0'
                                    // }}
                                    suggestedEmojisMode="false"
                                    previewConfig={{ showPreview: false }}
                                />
                            </div>
                        </ClickAwayListener>
                    }  
                </div>

            </form>

        </div>
        <div className={s.buttonBlock} disabled={isFetchingStatus}> <button type='submit' disabled={isFetchingStatus} form='createPost' className={s.button}> {isFetchingStatus ? <img src={smallPreloader} alt="" /> : "Опубликовать"} </button> </div>
    </div>)
}


export default PostForm;