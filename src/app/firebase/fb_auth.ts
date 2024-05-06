import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase.config";
import { userDataInterface } from "../interfaces/resuable_interfaces";
import { FirebaseFirestore } from "./Fb_Firestore";

export class FbAuth {
    static fbUserRegister = (email: any, password: any): Promise<string> => {
        const promise = new Promise<string>((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    resolve(user.user.uid);
                })
                .catch((err) => {
                    reject(err);
                });
        });

        return promise;
    };

    static loginWithFb = (email: any, password: any): Promise<string> => {
        const promise = new Promise<string>((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    resolve(user.user.uid);
                })
                .catch((err) => {
                    reject(err);
                });
        });

        return promise;
    };

    static signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        const promise = new Promise((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.

                    // const credential = GoogleAuthProvider.credentialFromResult(result);
                    // const token = credential.accessToken;

                    // The signed-in user info.
                    const user = result.user;

                    const userData: userDataInterface = {
                        email: user.email ? user.email : "",
                        username: user.displayName ? user.displayName : "",
                        profilePic: user.photoURL ? user.photoURL : "",
                        id: user.uid,
                    };

                    // adding user to fb!!!
                    FirebaseFirestore.addUserToFB(userData, user.uid);

                    resolve(userData);
                })
                .catch((error) => {
                    // Handle Errors here.
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // // The email of the user's account used.
                    // const email = error.customData.email;
                    // // The AuthCredential type that was used.
                    // const credential =
                    //     GoogleAuthProvider.credentialFromError(error);

                    reject(error);
                });
        });

        return promise;
    };
}
