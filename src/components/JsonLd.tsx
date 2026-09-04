import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": "https://www.bbmfoundation.org/#organization",
    "name": "BBM Foundation",
    "url": "https://www.bbmfoundation.org",
    "logo": "https://www.bbmfoundation.org/logo.png",
    "description":
      "BBM FOUNDATION is a social-impact and charitable foundation committed to creating meaningful change through service, opportunity creation, community development, and humanitarian initiatives.",
    "slogan": "Building Lives • Creating Opportunities • Serving Humanity",
    "knowsAbout": [
      "Education Support",
      "Skill Development",
      "Women Empowerment",
      "Youth Citizenship",
      "Health and Wellbeing Campaigns",
      "Community Development",
    ],
    "founder": {
      "@type": "Person",
      "name": "Dr. B. Giribabu (President & Managing Trustee)",
    },
    "email": "bbmindiafoundation@gmail.com",
    "telephone": "+91-8500863000",
    "sameAs": [
      "https://twitter.com/bbmfoundation",
      "https://www.facebook.com/bbmfoundation",
      "https://www.linkedin.com/company/bbmfoundation",
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "# 3-150, Main Street, Bypureddy Palem",
      "addressLocality": "Narsipatnam, Anakapalli Dist.",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "531116",
      "addressCountry": "IN",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
