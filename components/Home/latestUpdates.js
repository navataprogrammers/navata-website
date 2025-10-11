import styles from '../../styles/LatestUpdate.css';

export default function LatestUpdate() {
  return (
    <section className="updateSection">
      <div className="overlay">
        <div className="contentContainer">

          <div className="contentBox">
            <h1 className="heading">Latest Update</h1>
            <p className="announcement">
              We are happy to inform the opening of new branch at <span className="highlight">SANKARANKOVIL</span> in the state of Tamilnadu
            </p>
            <div className="details">
              <div>Navata Road Transport</div>
              <div>D.No.81/4, Bharathiyar - 8th Street,</div>
              <div>Near Siva School, SANKARANKOVIL – 627 756,</div>
              <div>Tenkasi District, Tamilnadu State.</div>
              <div>Code : <span className="highlight">SNKL</span></div>
            </div>
        </div>

        <div className="contentBox">
            <h1 className="heading">Latest Update</h1>
            <p className="announcement">
              We are happy to announce our partnership with XYZ Logistics for improved services.
            </p>
            <div className="details">
              <div>XYZ Logistics Pvt Ltd</div>
              <div>Collaboration starts from October 2025</div>
              <div>Pan India Expansion</div>
              <div>Contact : +91 12345 67890</div>
              <div>Code : <span className="highlight">XYZP</span></div>
            </div>
        </div>
        
        <div className="contentBox">
          <h1 className="heading">Latest Update</h1>
          <p className="announcement">
            We received the <span className="highlight">Best Service Award 2025</span> in the logistics category!
          </p>
          <div className="details">
            <div>Navata Road Transport</div>
            <div>Awarded by Logistics India</div>
            <div>October 2025</div>
            <div>Recognized State-wide</div>
            <div>Code : <span className="highlight">AWDS</span></div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
