import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import AddCommentButton from "../add-comment-button/add_comment_button.component";
import Input from "../input/input.component";
import { createClient } from "@supabase/supabase-js";
import "./comment.styles.scss";
import { CommentContext } from "../context/CommentContextPro";

export default function Comment({ comment }) {
  const supabaseUrl = "https://tqsgozbrgjmomhwzubbd.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxc2dvemJyZ2ptb21od3p1YmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1MTI0MDMsImV4cCI6MTk4ODA4ODQwM30.qJn6on47cObuMohWyfbIqHjv3BPBv29p-FWXJtw8iP0";

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { cid, date, text } = comment;

  const { comments, setComments } = useContext(CommentContext);

  const [showReplyTextBox, setShowReplyTextBox] = useState(false);

  const [replyText, setReplyText] = useState("");

  const handleAddReply = async () => {
    const replyid = uuid();
    const reply = {
      cid: replyid,
      text: replyText,
      date: new Date(),
      parentId: cid,
    };

    await supabase.from("comu").insert([reply]);
    setComments([...comments, { ...reply }]);

    setReplyText("");
  };

  return (
    <div className="comment__container">
      {/* <img src={user.pic} alt="avatar" className="user__image" /> */}

      <div className="comment__info">
        <div className="comment__user">
          {/* <h4 className="comment__user__name">{user.name}</h4> */}
          {/* <p className="time">{date}</p> */}
        </div>

        <p className="comment__text">{text}</p>

        <div className="reply__container">
          <div className="reply__actions">
            <p
              className="comment__reply"
              onClick={() => setShowReplyTextBox(!showReplyTextBox)}
            >
              Reply
            </p>
          </div>

          {showReplyTextBox && (
            <div className="reply__input">
              <Input setReplyText={setReplyText} replyText={replyText} />
              <AddCommentButton
                setShowReplyTextBox={setShowReplyTextBox}
                handleAddReply={handleAddReply}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
