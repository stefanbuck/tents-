module.exports = {
  images: {
    // The next/image component requires us to specify the exact
    // domain when serving images from an external domain.
    // There is a feature request to allow wildcard hostnames
    // https://github.com/vercel/next.js/issues/18632
    //
    // Meanwhile, we have to maintain a list of possible github urls
    domains: [
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com',
      'avatars4.githubusercontent.com',
      'avatars5.githubusercontent.com',
      'avatars6.githubusercontent.com',
      'avatars7.githubusercontent.com',
      'avatars8.githubusercontent.com',
    ],
  },
};
