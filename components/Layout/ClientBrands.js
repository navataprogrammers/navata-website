import React from 'react';

const ClientBrands = () => {
  const brands = [
    { id: 1,  name: 'Wipro',          logo: '/images/logos/wipro-logo.webp' },
    { id: 2,  name: 'Coromandel',     logo: '/images/logos/coromandel.webp' },
    { id: 3,  name: 'Numeric',        logo: '/images/logos/numeric.webp' },
    { id: 4,  name: 'Emami',          logo: '/images/logos/emami.webp' },
    { id: 5,  name: 'Pidilite',       logo: '/images/logos/pidilite.webp'},
    { id: 6,  name: 'ITC',            logo: '/images/logos/itc.webp' },
    { id: 7,  name: 'Gmmco',          logo: '/images/logos/gmmco.webp' },
    { id: 8,  name: 'VGaurd',         logo: '/images/logos/vguard.webp' },
    { id: 9,  name: 'Berger',         logo: '/images/logos/berger.webp' },
    { id: 10, name: 'Minister white', logo: '/images/logos/minister white.webp' },
    { id: 11, name: 'Nexon Paints',   logo: '/images/logos/nexon paints.webp' },
    { id: 12, name:  'ecof',          logo: '/images/logos/ecof-logo.webp' },
    { id: 13, name: 'Apollo',         logo: '/images/logos/Apollo.webp' },
    { id: 14, name: 'Shiridi Book ',  logo: '/images/logos/shiridi book depot.webp' },
    { id: 15, name: 'Kemin',          logo: '/images/logos/kemin.webp' },
    { id: 16, name: 'Rangaroa sons',  logo: '/images/logos/n ranga rao and sons.webp' },
    { id: 17, name: 'Zuari',          logo: '/images/logos/Zuari.webp' },
    { id: 18, name: 'Insecticides',   logo: '/images/logos/insecticides india.webp' },
    { id: 19, name: 'Astragen',       logo: '/images/logos/astragen.webp' },
    { id: 20, name: 'Sriram Bioseeds',logo: '/images/logos/sriram bioseeds.webp' },
    { id: 21, name: 'Aquasub',        logo: '/images/logos/aquasub.webp' },
    { id: 22, name: 'DR BR',          logo: '/images/logos/DR BR.webp' },
    { id: 23, name: 'Legrand',        logo: '/images/logos/Legrand-logo.webp' },
  ];

  const duplicatedBrands = [...brands, ...brands];

  return (
    <section style={{ padding: '64px 0', background: 'linear-gradient(to right, #f8fafc, #f3f4f6)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            Trusted by Leading Brands
          </h2>
          <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '600px', margin: '0 auto' }}>
            Join thousands of companies that trust us to deliver exceptional results
          </p>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', overflow: 'hidden' }}>
            <div
              className="animate-scroll"
              style={{
                display: 'flex',
                gap: '24px', // smaller gap for large screens
                alignItems: 'center',
                width: 'max-content',
                minWidth: '100%',
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  style={{
                    flexShrink: 0,
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(87, 182, 199, 0.1)',
                    width: '180px', // slightly smaller card
                    height: '130px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(87,182,199,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(63, 197, 214, 0.1)';
                  }}
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      transition: 'filter 0.3s ease',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll {
          animation: scrollRight 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @media (min-width: 1024px) {
          .animate-scroll {
            gap: 20px; /* tighter margins for large screens */
          }
        }
      `}</style>
    </section>
  );
};

export default ClientBrands;
