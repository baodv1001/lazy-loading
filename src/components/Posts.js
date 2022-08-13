import React, { useRef } from "react";
import PropTypes from "prop-types";
import posts from "../assets/data.json";
import { Card } from "./Card";
import clsx from "clsx";
import useLazyLoad from "../utils/useLazyLoad";
import { LoadingPosts } from "./LoadingPosts";

const NUM_PER_PAGE = 6;
const TOTAL_PAGES = 3;

const Posts = (props) => {
  const images = posts.data;
  const triggerRef = useRef(null);
  const onGrabData = (currentPage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data2 = images.slice(
          ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
          NUM_PER_PAGE * (currentPage % TOTAL_PAGES)
        );
        resolve(data2);
      }, 1000);
    });
  };

  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });

  return (
    <>
      <div className="grid grid-cols-3 gap-4 content-start">
        {data.map((image, index) => {
          return (
            <Card
              key={index}
              owner={image["owner"]}
              imageUrl={image["imageUrl"]}
            ></Card>
          );
        })}
      </div>
      <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
        <LoadingPosts />
      </div>
    </>
  );
};

Posts.propTypes = {};

export default Posts;
