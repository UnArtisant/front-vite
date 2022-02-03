import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePost: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCreatePostArgs = {
  options: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  params: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  params: UsernamePasswordInput;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  points: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
  user: User;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryPostsArgs = {
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['Float'];
  access_token?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  password: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: number, id: string, username: string, access_token?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: number, id: string, username: string, access_token?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: number, id: string, username: string } };

export type NewPostMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type NewPostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', _id: number, id: string } };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', _id: number, id: string, title: string, textSnippet: string, points: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', _id: number, username: string, id: string } }> };


export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(params: {username: $username, password: $password}) {
    user {
      _id
      id
      username
      access_token
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(params: {username: $username, password: $password}) {
    user {
      _id
      id
      username
      access_token
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UserDocument = gql`
    query User {
  user {
    _id
    id
    username
  }
}
    `;

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const NewPostDocument = gql`
    mutation newPost($title: String!, $text: String!) {
  createPost(options: {title: $title, text: $text}) {
    _id
    id
  }
}
    `;

export function useNewPostMutation() {
  return Urql.useMutation<NewPostMutation, NewPostMutationVariables>(NewPostDocument);
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $offset: Int) {
  posts(limit: $limit, offset: $offset) {
    _id
    id
    title
    textSnippet
    points
    createdAt
    updatedAt
    user {
      _id
      username
      id
    }
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};