"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { createComment, deleteComment } from "@/lib/comments";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

interface CommentsProps {
  postId: string;
  comments: Comment[];
}

export function Comments({ postId, comments: initialComments }: CommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const comment = await createComment({
        postId,
        content: newComment.trim(),
      });
      setComments([...comments, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to create comment:", error);
      alert("Failed to create comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">
        Comments ({comments.length})
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={3}
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="mt-2"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <p className="text-gray-600">Please sign in to leave a comment.</p>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={comment.profiles.avatar_url || "/default-avatar.png"}
                  alt={comment.profiles.full_name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">
                  {comment.profiles.full_name}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              {user &&
                (user.id === comment.user_id ||
                  user.user_metadata?.is_admin) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                )}
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
