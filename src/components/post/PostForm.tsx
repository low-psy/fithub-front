import React from 'react';
import { Form, FormMethod, useActionData } from 'react-router-dom';
import PostInput from './FormText';
import InputComponent from './FormInput';
import TextareaComponent from './FormTextarea';
import SubmitButton from './FormSubmitButton';
import ErrorMessage from './FormError';
import FormImage from './FormMultipleImage';

interface PostFormProps {
  content?: string;
  images?: string[];
  hashTags?: string[];
  useCase: string;
  id?: number;
}

const PostForm: React.FC<PostFormProps> = ({
  content,
  images,
  hashTags,
  useCase,
  id,
}) => {
  const errors = useActionData() as { message: string };

  let method: FormMethod = 'post';
  let action;
  if (useCase === 'create') {
    method = 'post';
    action = '/newpost';
  } else if (useCase === 'update') {
    method = 'put';
    action = '/profile/mypost';
  }

  return (
    <Form
      method={method}
      action={action}
      className="space-y-12 pb-6 pt-4"
      encType="multipart/form-data"
    >
      {errors ? (
        <ErrorMessage className="rounded-md text-lg font-bold">
          {errors?.message}
        </ErrorMessage>
      ) : null}
      <div>
        <input hidden name="id" value={id} />
        <PostInput spanText="write content" htmlFor="content" titleText="내용">
          <TextareaComponent
            placeholder="내용을 입력해 주세요"
            name="content"
            className="h-48"
            id="content"
            value={content}
          />
        </PostInput>
      </div>
      <div>
        <FormImage multiple value={images}>
          이미지 선택
        </FormImage>
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
            value={hashTags?.join(' ')}
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
