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
    title: 'MySQL',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        MySQL is an open source relational database management system (RDBMS) based on Structured Query Language (SQL).
      </>
    ),
    link: '/eightbit-saurus/docs/MySQL/Install',
    img: 'img/mysql_icon.png',
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
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
