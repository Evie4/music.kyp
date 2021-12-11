module.exports = {
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "music.kyp",
        description: "easy discord music building ✨🎶",
        siteUrl: "https://music-kyp.ml/",
        sections: ['Starting', 'Constructors' , 'Reference', 'Functions'],
        navItems: [{ title: 'Docs', url: '/docs/' }, { title: 'Support', url: '/support/' }],
        githubRepositoryURL: 'https://github.com/DevelopersSupportAR/music.kyp',
        docSearch: {
          apiKey: 'AIzaSyDCtMuB6jQaKhZVDYfVVtMDPLcxCXnFNf8',
          indexName: 'search'
        },
      },
    },
  ],
};