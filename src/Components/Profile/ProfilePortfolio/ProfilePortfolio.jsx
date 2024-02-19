import s from './ProfilePortfolio.module.css';
import TitleBlock from './TitleBlock';
import PortfolioBlock from './PortfolioBlock';
import Gallery from '../../common/Gallery/Gallery';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalGallery from '../../common/Modal/ModalGallery';
import { savePhotoGallery, saveUpdatedGallery } from '../../../redux/profile-reducer';

const ProfilePortfolio = (props) => {
    const [modalGalleryActive, setModalGalleryActive] = useState(false);
    const imagesArray = useSelector(state => state.profilePage.profile.portfolio);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const dispatch = useDispatch();
    const [images, setImagesArray] = useState(imagesArray || [])
 
    const onPhotoPortfolioSelected = (e) => {
        if (e.target.files.length) {
            const newPhotos = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            dispatch(savePhotoGallery(newPhotos));
        }
    }

    useEffect(() => {
        setImagesArray(imagesArray || []);
      }, [imagesArray]);
      
      
    
    const handleClick = (index)=>{
        setCurrentImageIndex(index);
        setModalGalleryActive(true);
    }
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>  
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>  
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const handleDeleteImage = () => {
        const updatedImages = [...images];
        updatedImages.splice(currentImageIndex, 1);
        if (currentImageIndex === images.length - 1) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
        if ( updatedImages.length === 0) {
            setModalGalleryActive(false);
        }
        dispatch(saveUpdatedGallery(updatedImages));
    }

    const handleClickonImage = (e) => {
     
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const imageWidth = rect.width;
        const clickedSide = clickX <= imageWidth / 2 ? 'left' : 'right';
        if (clickedSide === 'left' && currentImageIndex > 0) {
            handlePrevImage();}
          if (clickedSide === 'right' && currentImageIndex < images.length - 1) {
                handleNextImage();}
       
     
   }

    return (  <div className={s.profilePortfolio}>
        <TitleBlock onPhotoPortfolioSelected={onPhotoPortfolioSelected} isAuth={props.isAuth} />
        <PortfolioBlock modalGalleryActive={modalGalleryActive} 
        setModalGalleryActive={setModalGalleryActive} 
        portfolio={props.props.portfolio} 
        handleClick={handleClick}
        isAuth={props.isAuth} /> 
        <ModalGallery setActive={setModalGalleryActive} active={modalGalleryActive}>
        <Gallery index={currentImageIndex} setModalGalleryActive={setModalGalleryActive}
         images={images}
         handleNextImage={handleNextImage}
         handlePrevImage={handlePrevImage} 
         handleDeleteImage={handleDeleteImage}
         currentImageIndex={currentImageIndex}
         isAuth={props.isAuth}
         handleClickonImage={handleClickonImage}
      
         />
        </ModalGallery>
        
        </div>
    )
}
 

export default ProfilePortfolio;


 
