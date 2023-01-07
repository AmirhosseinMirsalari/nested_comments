import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Input from "../input/input.component";
import "./container.styles.scss";
import AddCommentButton from "../add-comment-button/add_comment_button.component";
import Comment from "../comment/comment.component";
import Reply from "../Reply/reply.component";
import { createClient } from "@supabase/supabase-js";
import { CommentContext } from "../context/CommentContextPro";

export default function Container() {
  const supabaseUrl = "https://tqsgozbrgjmomhwzubbd.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxc2dvemJyZ2ptb21od3p1YmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1MTI0MDMsImV4cCI6MTk4ODA4ODQwM30.qJn6on47cObuMohWyfbIqHjv3BPBv29p-FWXJtw8iP0";

  const supabase = createClient(supabaseUrl, supabaseKey);

  // const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const { comments, setComments } = useContext(CommentContext);

  const addComment = async () => {
    if (commentText !== "") {
      let comment = {
        cid: uuid(),
        text: commentText,
        date: new Date(),
      };
      // dispatch({
      //   type: Actions.ADD_COMMENT,
      //   comment: comment,
      // });
      await supabase.from("comu").insert([comment]);
      setComments([...comments, { ...comment }]);
    }
    setCommentText("");
  };

  const getComment = async () => {
    try {
      const { data } = await supabase.from("comu").select("*");
      setComments([...comments, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div className="container">
      <h2>Comments</h2>
      <div className="root__comments">
        {comments.map(
          (comment) =>
            !comment.parentId && (
              <div key={comment.cid}>
                <Comment comment={comment} />
                <Reply parentId={comment.cid} />
              </div>
            )
        )}
      </div>

      <Input commentText={commentText} setCommentText={setCommentText} />

      <AddCommentButton addComment={addComment} />
    </div>
  );
}
