import React from 'react';
import { FormMethod, useFetcher } from 'react-router-dom';
import SubmitButton from '../../components/form/FormSubmitButton';
import FormImage from '../../components/form/FormMultipleImage';
import FormImageSelect from '../../components/form/FormImageSelect';
import FormLabel from '../../components/form/FormLabel';
import FormInput from '../../components/form/FormInput';
import { INewPostError } from '../../types/form';
import FormError from '../../components/form/FormError';

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
  const fetcher = useFetcher();
  const errors = fetcher.data as INewPostError;

  let method: FormMethod = 'post';
  if (useCase === 'put') {
    method = 'put';
  }

  return (
    <fetcher.Form
      method={method}
      action={`/newpost?useCase=${useCase}`}
      className="space-y-12 pb-6 pt-4"
      encType="multipart/form-data"
    >
      <div>
        <FormLabel htmlFor="content">
          <h2 className="text-3xl text-zinc-800">내용</h2>
          <FormInput
            placeholder="내용을 입력해주세요."
            id="content"
            name="content"
            error={errors}
            defaultValue={content}
            isTextArea
            className="text-xl"
          />
          {errors?.content && <FormError>{errors?.content}</FormError>}
        </FormLabel>
        <input hidden name="id" value={id} />
      </div>
      <div>
        <FormLabel htmlFor="image">
          <h2 className="text-3xl text-zinc-800">이미지</h2>
          {useCase === 'post' ? (
            <FormImage multiple />
          ) : (
            <FormImageSelect value={images} />
          )}
          {errors?.images && <FormError>{errors?.images}</FormError>}
        </FormLabel>
      </div>
      <div>
        <FormLabel htmlFor="hashtag">
          <h2 className="text-3xl text-zinc-800">해시태그</h2>
          <FormInput
            placeholder="해시태그를 입력해주세요"
            id="hashtag"
            type="text"
            name="hashtag"
            error={errors}
            defaultValue={hashTags}
            className="text-xl"
          />
        </FormLabel>
      </div>
      <div>
        <SubmitButton className="h-15 text-3xl font-extrabold text-main">
          {useCase === 'update' ? '수정하기' : '제출하기'}
        </SubmitButton>
      </div>
    </fetcher.Form>
  );
};

export default PostForm;
