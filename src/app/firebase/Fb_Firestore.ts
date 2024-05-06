import {
    DocumentData,
    Query,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { Dispatch, SetStateAction } from "react";
import { userDataInterface } from "../interfaces/resuable_interfaces";

export class FirebaseFirestore {
    // create a user
    static addUserToFB = async (info: any, id: any) => {
        await setDoc(doc(db, "Users", id), info, {
            merge: true,
        });
    };

    // get current user data
    static getCurrentUser = async (userId: string) => {
        const userRef = doc(db, "Users", userId);
        const userSnap = await getDoc(userRef);
        let user;
        if (userSnap.exists()) {
            user = userSnap.data();
        } else {
            user = null;
        }
        return user as userDataInterface;
    };

    static getRealtimeUserInfo = async (
        id: string,
        setUser: Dispatch<SetStateAction<userDataInterface | null>>
    ) => {
        onSnapshot(doc(db, "Users", id), (doc) => {
            setUser(doc.data() as userDataInterface);
        });
    };
}

// add a ad to firestore
// export const addAdToFB = async (info: adInterface) => {
//     // add data to allads collection
//     const docRef = await addDoc(collection(db, "Allads"), info);

//     // update the uid
//     await upDateAdData(docRef.id, { adUid: docRef.id });
// };

// export const upDateAdData = async (docId: string, data: any) => {
//     await setDoc(doc(db, "Allads", docId), data, { merge: true });
// };

// export const getMyFavAds = async (userId: string) => {
//     const q = query(
//         collection(db, "Allads"),
//         where("addToFavBy", "array-contains", userId)
//     );

//     let catBaseAds: adInterface[] = [];
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//         const data = doc.data() as adInterface;
//         catBaseAds.push(data);
//     });

//     return catBaseAds;
// };

// get single ad
// export const getSingleAd = async (adId: string) => {
//     const adRef = doc(db, "Allads", adId);
//     const adData = await getDoc(adRef);

//     let ad;
//     if (adData) {
//         ad = adData.data() as adInterface;
//     } else {
//         ad = null;
//     }

//     return ad;
// };

// get category based ads

// export const getCategoryBasedAds = async (category: string, adUid: string) => {
//     const q = query(
//         collection(db, "Allads"),
//         where("category", "==", category)
//     );

//     let catBaseAds: adInterface[] = [];
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//         const data = doc.data() as adInterface;

//         // Exclude same id!!
//         if (data.adUid !== adUid) {
//             catBaseAds.push(data);
//         }
//     });

//     return catBaseAds;
// };

// // get all my ads

// export const getAllMyAds = async (userUid: string) => {
//     const q = query(
//         collection(db, "Allads"),
//         where("posterUid", "==", userUid),
//         orderBy("postTime", "desc")
//     );

//     let userAds: adInterface[] = [];
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//         const data = doc.data() as adInterface;
//         userAds.push(data);
//     });

//     return userAds;
// };

// // delete my ad
// export const deleteMyAd = async (adId: string) => {
//     await deleteDoc(doc(db, "Allads", adId));
// };
