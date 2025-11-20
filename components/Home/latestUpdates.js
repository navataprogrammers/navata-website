import styles from '../../styles/LatestUpdate.css';

export default function LatestUpdate() {
  return (
    <section className="updateSection">
      <div className="overlay">
        <div className="contentContainer has-one-child">
          <div className="contentBox">
            <h1 className="heading">Latest Update</h1>
            <p className="announcement">
              We are happy to inform the opening of new branch at 
              <span className="highlight"> VIJAYAWADA - PIPULA ROAD </span>
              in the state of Andhra Pradesh.
            </p>
            <div className="details">
              <div>Navata Road Transport</div>
              <div>D.No.1-183/5, P&T Colony,</div>
              <div>Inner Ring Road, Pipula Road – 520012</div>
              <div>Vijayawada - NTR</div>
              <div>Code : <span className="highlight">VZPR</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}