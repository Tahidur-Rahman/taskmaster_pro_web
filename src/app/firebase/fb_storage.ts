import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase.config";

// export const uploadFileToStorage = (image: any) => {
//     const promise = new Promise(async (resolve, reject) => {
//         const imagesRef = ref(storage, `adPictures/${Date.now() + image.name}`);
//         const uploadTask = uploadBytesResumable(imagesRef, image);
//         return uploadTask.on(
//             "state_changed",
//             (snapshot) => {},
//             (error) => {
//                 reject(error);
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     resolve(downloadURL);
//                 });
//             }
//         );
//     });

//     return promise;
// };

export const uploadFileToStorage = (image: any): Promise<string> => {
    const promise = new Promise<string>(async (resolve, reject) => {
        // Convert Data URL to Blob
        const blob = await fetch(image.content).then((res) => res.blob());

        const imagesRef = ref(
            storage,
            `taskPictures/${Date.now() + image.name}`
        );
        const uploadTask = uploadBytesResumable(imagesRef, blob);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log("snapshot value is  ", snapshot);
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });

    return promise;
};
