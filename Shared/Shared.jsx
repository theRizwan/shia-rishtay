import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from '../config/FirebaseConfig'

const GetSavedList = async (user) => {
    const docSnap = await getDoc(doc(db, 'UserSaveProfiles'));
    if (docSnap?.exists()) {
        console.log(docSnap.data())
        return docSnap.data();
    } else {
        await setDoc(doc(db, 'UserSaveProfiles', 'rizwanxplorer@gmail.com'), {
            email: user?.primaryEmailAddress?.emailAddress,
            favorites: []
        });
        return undefined
    }
};

const UpdateSaved = async (user, savedList) => {
    const docRef = doc(db, 'UserSaveProfiles', user?.primaryEmailAddress?.emailAddress );
    try {
        await updateDoc(docRef, {
            SavedProfiles: savedList
        })
    } catch (e) {

    }
}

export default {
    GetSavedList,
    UpdateSaved
}