"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function Page() {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const postRef = collection(db, "posts");

    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Realtime updates</h1>
      {posts.map((post : {title:string, content:string, id:string}) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
