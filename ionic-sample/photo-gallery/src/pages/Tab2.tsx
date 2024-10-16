import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonActionSheet,
} from '@ionic/react';


import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

import { camera, trash, close } from 'ionicons/icons';

import { usePhotoGallery } from '../hook/usePhotoGallery';

const Tab2: React.FC = () => {

    const { takePhoto, photos } = usePhotoGallery();



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Photo Gallery</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        {photos.map((photo, index) => (
                            <IonCol size="6" key={photo.filepath}>
                                <IonImg src={photo.webviewPath} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
                <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton onClick={() => takePhoto()}>
                        <IonIcon icon={camera}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
