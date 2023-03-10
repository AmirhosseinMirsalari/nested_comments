import React, { useContext, useEffect, useState } from "react";
import Comment from "../comment/comment.component";
import { CommentContext } from "../context/CommentContextPro";

import "./reply.styles.scss";

function Reply({ parentId }) {
  const [replyCount, setReplyCount] = useState(0);
  const [showReplies, setShowReplies] = useState(true);
  const { comments } = useContext(CommentContext);


  useEffect(() => {
    let replyCount = 0;
    comments.forEach(comment => { 
      if (comment.parentId === parentId) {
        replyCount++;
      } 
    });
    setReplyCount(replyCount);
  }, [comments, parentId]);

  const renderReply = (parentId) => {
    return comments.map((comment) => (
      <div className="renderReply">
        {comment.parentId === parentId && (
          <div
            className="render__reply"
            style={{ width: "80%", marginLeft: "50px" }}
          >
            <Comment comment={comment} />
            <Reply comments={comments} parentId={comment.cid} />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      {/* {replyCount > 0 && (
        <p
          className="reply__handler"
          onClick={() => setShowReplies(!showReplies)}
        >
          {
            showReplies 
            ? "Hide replies" 
            : `Show ${replyCount} replies`
          }
          
        </p>
      )} */}
      {renderReply(parentId)}
    </div>
  );
}

export default Reply;
