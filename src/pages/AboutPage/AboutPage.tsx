import styles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <div data-testid="about-page-content" className={styles.aboutContainer}>
      <div>
        Hi! I&#39;m Anastasia. <br />
        I&#39;m a motivated frontend developer passionate about creating
        meaningful digital experiences using modern web technologies. <br />
        I&#39;m eager to keep learning and growing within a collaborative,
        professional tech environment.
      </div>
      <div>
        GitHub:
        <a
          className={styles.aboutLink}
          href="https://github.com/silvermockingjay"
          target="_blank"
          rel="noreferrer"
        >
          @silvermockingjay
        </a>
      </div>
      <div>
        This app is developed to showcase React: Routing and Hooks Task of
        <a
          className={styles.aboutLink}
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React 2025 Q3 course
        </a>
      </div>
    </div>
  );
}
