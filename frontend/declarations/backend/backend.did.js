export const idlFactory = ({ IDL }) => {
  const Tweet = IDL.Record({
    'id' : IDL.Nat,
    'retweets' : IDL.Nat,
    'text' : IDL.Text,
    'author' : IDL.Text,
    'likes' : IDL.Nat,
    'timestamp' : IDL.Int,
  });
  const Result_1 = IDL.Variant({ 'ok' : Tweet, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'createTweet' : IDL.Func([IDL.Text, IDL.Text], [Result_1], []),
    'getTweets' : IDL.Func([], [IDL.Vec(Tweet)], ['query']),
    'likeTweet' : IDL.Func([IDL.Nat], [Result], []),
    'retweetTweet' : IDL.Func([IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
