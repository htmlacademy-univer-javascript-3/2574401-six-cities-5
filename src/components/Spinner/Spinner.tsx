import styles from './Spinner.module.css';

export const Spinner = () => (
  <div className={styles.spinnerContainer} data-testid="spinner">
    <div className={styles.spinner}></div>
  </div>
);
