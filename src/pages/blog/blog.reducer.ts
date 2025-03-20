import { createReducer } from "@reduxjs/toolkit";
import { Post } from "../../types/blog.type";

interface BlogState {
    postList: Post[];
}
const initalState: BlogState = {
    postList: [],
};
// Hàm builder callback dùng để xử lý action và cập nhật state
const blogReducer = createReducer(initalState, (builder) => {});

export default blogReducer;
