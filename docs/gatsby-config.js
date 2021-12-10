module.exports = {
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "music.kyp",
        description: "easy discord music building ✨🎶",
        siteUrl: "https://music-kyp.ml/",
        sections: ['Starting', 'Constructors' , 'Reference', 'Functions'],
        navItems: [{ title: 'Docs', url: '/docs/' }],
      },
    },
  ],
};