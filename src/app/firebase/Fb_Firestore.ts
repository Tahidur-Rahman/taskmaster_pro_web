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
import { auth, db } from "./firebase.config";
import { Dispatch, SetStateAction } from "react";
import {
    projectInterface,
    taskInterface,
    userDataInterface,
} from "../interfaces/resuable_interfaces";

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

    // get all projects which in are added or created
    static getMyProjects = async (
        setProjects: Dispatch<SetStateAction<projectInterface[] | []>>
    ) => {
        const q = query(
            collection(db, "Projects"),
            where("assignedTo", "array-contains", auth.currentUser?.email),
            orderBy("updatedAt", "desc")
        );

        onSnapshot(q, (querySnapshot) => {
            const projects: projectInterface[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as projectInterface;
                projects.push(data);
            });
            setProjects(projects);
        });
    };

    //  get just you submitted tasks
    static getAllMySubmittedTasks = async (
        setMyAddedTasks: Dispatch<SetStateAction<taskInterface[] | []>>,
        setProjectImages: Dispatch<SetStateAction<string[]>>
    ) => {
        //  getting user have access projects
        const q = query(
            collection(db, "Projects"),
            where("assignedTo", "array-contains", auth.currentUser?.email)
        );
        let tasks: taskInterface[] = [];
        let pImages: string[] = [];

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            tasks = [];
            pImages = [];
            querySnapshot.forEach((doc) => {
                let projectData = doc.data() as projectInterface;
                pImages.push(projectData.pImage);
                const pq = query(
                    collection(db, "Projects", projectData.pId, "Tasks"),
                    where("creatorId", "==", auth.currentUser?.uid)
                    // orderBy("updatedAt", "desc")
                );
                const unsubscribeTask = onSnapshot(pq, (pquerySnap) => {
                    pquerySnap.forEach((doc) => {
                        tasks.push(doc.data() as taskInterface);
                    });
                    // console.log("tasks length ************", tasks.length);
                    // console.log("pImages length ************", pImages.length);
                    setMyAddedTasks(tasks);
                    setProjectImages(pImages);
                });
            });
        });

        // Remember to unsubscribe when component unmounts
        return unsubscribe;
    };

    //  get single project all tasks
    static getProjectAllTasks = async (
        setTasks: Dispatch<SetStateAction<taskInterface[] | []>>,
        projectId: string
    ) => {
        const q = query(
            collection(db, "Projects", projectId, "Tasks"),
            orderBy("updatedAt", "desc")
        );

        onSnapshot(q, (querySnapshot) => {
            const tasks: taskInterface[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as taskInterface;
                tasks.push(data);
            });
            setTasks(tasks);
        });
    };

    //  add new task to project
    static addTaskToProject = async (
        data: taskInterface,
        projectId: string
    ) => {
        // add data to allads collection
        const docRef = await addDoc(
            collection(db, "Projects", projectId, "Tasks"),
            data
        );

        // update the uid
        await FirebaseFirestore.updateProjectId(
            docRef.id,
            { taskId: docRef.id },
            projectId
        );
    };

    // update tasks data
    static updateProjectId = async (
        docId: string,
        data: any,
        projectId: string
    ) => {
        await setDoc(doc(db, "Projects", projectId, "Tasks", docId), data, {
            merge: true,
        });
    };
}
