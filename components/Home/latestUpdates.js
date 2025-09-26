import styles from '../../styles/LatestUpdate.module.css';

export default function LatestUpdate() {
  return (
    <section className={styles.updateSection}>
      <div className={styles.overlay}>
        <div className={styles.contentBox}>
          <h1 className={styles.heading}>Latest Update</h1>
          <p className={styles.announcement}>
            We are happy to inform the opening of new branch at <span className={styles.highlight}>SANKARANKOVIL</span> in the state of Tamilnadu
          </p>
          <div className={styles.details}>
            <div>Navata Road Transport</div>
            <div>D.No.81/4, Bharathiyar - 8th Street,</div>
            <div>Near Siva School, SANKARANKOVIL – 627 756,</div>
            <div>Tenkasi District, Tamilnadu State.</div>
            <div>Code : <span className={styles.highlight}>SNKL</span></div>
          </div>
          <div className={styles.awards}>
            <span>🏆 Industry Outlook Award 2022</span>
            <span>🏆 Industry Outlook Award 2022</span>
          </div>
        </div>
      </div>
    </section>
  );
}
