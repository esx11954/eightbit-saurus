import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Java',
    // Svg: require('@site/static/img/java.svg').default,
    description: (
      <>
        Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself.
      </>
    ),
    link: '/eightbit-saurus/docs/category/環境構築',
    img: 'img/java_icon.png',
  },
  {
    title: 'Python',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
      </>
    ),
    link: '/eightbit-saurus/docs/Python/page1',
    img: 'img/python_icon2.png',
  },
  {
    title: 'MySQL',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        MySQL is an open source relational database management system (RDBMS) based on Structured Query Language (SQL).
      </>
    ),
    link: '/eightbit-saurus/docs/category/mysql',
    img: 'img/mysql_icon.png',
  },
  {
    title: 'Excel VBA',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        The VBA programming language allows users to access functions beyond what is available in the MS Office applications.
      </>
    ),
    link: '/eightbit-saurus/docs/category/excelvba',
    img: 'img/excel_icon.png',
  },
  {
    title: 'Network',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Computer Networks are one of the important aspects of Computer Science.
      </>
    ),
    link: '/eightbit-saurus/docs/category/network',
    img: 'img/network_icon.png',
  },
  {
    title: 'Linux',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        In fact, one of the most popular platforms on the planet, Android, is powered by the Linux operating system.
      </>
    ),
    link: '/eightbit-saurus/docs/category/linux',
    img: 'img/linux_icon2.png',
  },
];

function Feature({Svg, title, description, link, img}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
        <a href={link}><img src={img}/></a>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
