// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Eightbit Saurus',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/eb_logo_5.svg',

  // Set the production url of your site here
  url: 'https://esx11954.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/eightbit-saurus/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-JW1ZZBK2ZV',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  scripts: [
    {
      src: '/eightbit-saurus/js/guardian.js',
      async: false,
    },
  ],

  markdown: {
    mermaid: true,
  },
  themes: [//'@docusaurus/theme-mermaid', 
    '@docusaurus/theme-live-codeblock'],
  plugins: [
      // Using three docs plugins at the same time!
      // Assigning a unique ID for each without asking the user to do it
      // ['@docusaurus/plugin-content-docs', {id: 'docs1', path: '/docs'}],
    ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/eightbit_saurus.png',
      image: 'img/eb_saurus2.png',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Eightbit Saurus',
        logo: {
          alt: 'My Site Logo',
          src: 'img/eb_logo_5.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'tutorial',
          // },
          {
            type: 'docSidebar',
            sidebarId: 'javaSidebar',
            position: 'left',
            label: 'Java',
          },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'pythonSidebar',
          //   position: 'left',
          //   label: 'Python',
          // },
          {
            type: 'docSidebar',
            sidebarId: 'jsSidebar',
            position: 'left',
            label: 'JavaScript',
          },
          {
            type: 'docSidebar',
            sidebarId: 'foundationSidebar',
            position: 'left',
            label: '基礎研修',
          },

          
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'mysqlSidebar',
          //   position: 'left',
          //   label: 'MySQL',
          // },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'networkSidebar',
          //   position: 'left',
          //   label: 'Network',
          // },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'ccnaSidebar',
          //   position: 'left',
          //   label: 'ccna',
          // },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'lpiSidebar',
          //   position: 'left',
          //   label: 'lpi',
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Blog',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/facebook/docusaurus',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} EIGHTBIT, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'powershell', 'batch'],
      },

      /* mermaid configs. */
      // mermaid: {
      //   theme: {light: 'neutral', dark: 'dark'},
      // },

      /* liveCodeBlock configs. */
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
    }),
};

export default config;
