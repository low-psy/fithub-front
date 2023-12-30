import React from 'react';
import { Form, useActionData } from 'react-router-dom';
import PostInput from '../../components/post/FormText';
import InputComponent from '../../components/post/FormInput';
import TextareaComponent from '../../components/post/FormTextarea';
import SubmitButton from '../../components/post/FormSubmitButton';
import ErrorMessage from '../../components/post/FormError';
import FormImage from '../../components/post/FormImage';

const PostForm = () => {
  const errors = useActionData() as { message: string };

  return (
    <Form
      method="post"
      action="/newpost"
      className="space-y-12 pb-6 pt-4"
      encType="multipart/form-data"
    >
      {errors ? (
        <ErrorMessage className="rounded-md text-lg font-bold">
          {errors.message}
        </ErrorMessage>
      ) : null}
      <div>
        <PostInput spanText="write content" htmlFor="content" titleText="내용">
          <TextareaComponent
            placeholder="내용을 입력해 주세요"
            name="content"
            className="h-48"
            id="content"
          />
        </PostInput>
      </div>
      <div>
        <FormImage multiple>이미지 선택</FormImage>
      </div>
      <div>
        <PostInput
          spanText="write keyword"
          htmlFor="hashtag"
          titleText="해시태그"
        >
          <InputComponent
            placeholder="ex) #해시태그"
            name="hashtag"
            type="text"
            id="hashtag"
          />
        </PostInput>
      </div>
      <SubmitButton className="-mt-4 w-2/3 rounded-full py-5 text-2xl font-bold text-main">
        제출하기
      </SubmitButton>
    </Form>
  );
};

export default PostForm;
