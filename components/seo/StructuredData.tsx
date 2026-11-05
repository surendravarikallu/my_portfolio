export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://surendravarikallu.dev/#person",
    "name": "Surendra Varikallu",
    "url": "https://surendravarikallu.dev",
    "image": "https://surendravarikallu.dev/preview.png",
    "jobTitle": "Full Stack & AI Developer",
    "description": "Full Stack Developer building scalable platforms like Skillnox.AI and Skillnox, load-tested with 5,000+ concurrent users at 100% success rate. Certified in AWS, SAP ABAP Cloud, and ServiceNow (CSA & CAD).",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "KITS Akshar Institute of Technology",
    },
    "sameAs": [
      "https://github.com/surendravarikallu",
      "https://www.linkedin.com/in/surendravarikallu/",
      "https://x.com/surendravarikallu",
      "https://www.credly.com/users/surendra-varikallu",
      "https://www.instagram.com/_.mystic_soul.04/",
    ],
    "knowsAbout": [
      "Full Stack Development",
      "React.js",
      "Next.js",
      "Node.js",
      "Python",
      "Django",
      "ServiceNow CSA & CAD",
      "AWS Certified AI Practitioner",
      "SAP ABAP on SAP HANA",
      "PostgreSQL",
      "System Architecture & Scalability",
      "Local LLMs (Qwen)",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://surendravarikallu.dev/#website",
    "url": "https://surendravarikallu.dev",
    "name": "Surendra Varikallu Portfolio",
    "description": "Portfolio of Surendra Varikallu — Full Stack & AI Developer",
    "author": {
      "@id": "https://surendravarikallu.dev/#person",
    },
    "inLanguage": "en-US",
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://surendravarikallu.dev/#profilepage",
    "url": "https://surendravarikallu.dev",
    "name": "Surendra Varikallu | Full Stack & AI Developer",
    "mainEntity": {
      "@id": "https://surendravarikallu.dev/#person",
    },
    "dateCreated": "2025-01-01T00:00:00Z",
    "dateModified": new Date().toISOString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}

