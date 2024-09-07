import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : Tweet } |
  { 'err' : string };
export interface Tweet {
  'id' : bigint,
  'retweets' : bigint,
  'text' : string,
  'author' : string,
  'likes' : bigint,
  'timestamp' : bigint,
}
export interface _SERVICE {
  'createTweet' : ActorMethod<[string, string], Result_1>,
  'getTweets' : ActorMethod<[], Array<Tweet>>,
  'likeTweet' : ActorMethod<[bigint], Result>,
  'retweetTweet' : ActorMethod<[bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
