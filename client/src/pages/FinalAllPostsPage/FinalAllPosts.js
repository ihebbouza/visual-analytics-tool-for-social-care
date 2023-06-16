/***********************Components imports********************************/
import { Navbar } from "../../components";
import { FinalPost } from "../../components";
import { Spin } from "antd";
/** CSS for the bootstrap * */
/***********************React imports*************************************/
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
/***********************Slices imports************************************/
import { getAllPostsAsync } from "../../features/allPosts/allPostsSlice"; 
/***********************Utils imports*************************************/

const FinalAllPosts = () => {
  /************* Setup ****************** */
  const dispatch = useDispatch();
  // const { allPosts, allPostsLoading } = useSelector((state) => state.showPost);
  const { allPosts, allPostsLoading } = useSelector((state) => state.allPosts)
  /************* Hooks ****************** */
  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);
  /************* Event handlers ****************** */
  return (
    <div>
      <Navbar />
      {allPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Spin size="large" tip="loading posts..." />
        </div>
      ) : (
        /* Implementing the pagination for the posts 5 perpage */
        <div style={{ maxWidth: "50%", margin: "0 auto" }}>
          {allPosts.length > 0 ? (
            allPosts.map((post) => <FinalPost key={post.id} post={post} />)
          ) : (
            <p style={{ textAlign: "center" }}>No posts found in the DB</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FinalAllPosts;
