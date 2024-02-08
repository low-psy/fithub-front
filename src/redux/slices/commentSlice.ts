import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCommentState } from '../initialStates/initialStates';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {
    SET_REPLY_TO: (
      state,
      action: PayloadAction<{ replyTo: string; replyId: number | null }>,
    ) => {
      const replyPrefix = action.payload.replyTo
        ? `@${action.payload.replyTo} `
        : '';
      state.replyTo = replyPrefix;
      state.selectReplyId = action.payload.replyId;
    },
  },
});

export const { SET_REPLY_TO } = commentSlice.actions;

export default commentSlice.reducer;
