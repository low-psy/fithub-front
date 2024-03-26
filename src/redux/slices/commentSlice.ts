import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCommentState } from '../initialStates/initialStates';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {
    SET_REPLY_TO: (
      state,
      action: PayloadAction<{
        replyTo: string;
        replyId: number | null;
        comment?: string | undefined;
      }>,
    ) => {
      const replyPrefix = action.payload.replyTo
        ? `@${action.payload.replyTo} `
        : '';
      state.replyTo = replyPrefix;
      state.selectReplyId = action.payload.replyId;
      if (action.payload.comment) {
        state.comment = action.payload.comment;
      }
    },
    SET_REPLY_INITIALIZE: (state) => {
      state.replyTo = '';
      state.selectReplyId = null;
    },
  },
});

export const { SET_REPLY_TO, SET_REPLY_INITIALIZE } = commentSlice.actions;

export default commentSlice.reducer;
