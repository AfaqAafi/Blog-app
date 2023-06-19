"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { MdDeleteSweep } from "react-icons/md";
import styles from "./page.module.css";
const Dashboard = () => {
  const router = useRouter();
  const session = useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );
  if (session.status === "loading") {
    return <p> Loading .... </p>;
  }
  if (session.status === "unauthenticated") {
    return router.push("/dashboard/login");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target[0].value;
    const desc = event.target[1].value;
    const image = event.target[2].value;
    const content = event.target[3].value;
    // sending data to the database
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          image,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      event.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {data?.map((post) => {
            return (
              <div className={styles.post} key={post._id}>
                <div className={styles.imgContainer}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={200}
                    height={100}
                  />
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span
                  className={styles.del}
                  onClick={() => handleDelete(post._id)}
                >
                  <MdDeleteSweep />
                </span>
              </div>
            );
          })}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add new posts</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input
            type="text"
            placeholder="Description"
            className={styles.input}
          />
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};
export default Dashboard;
