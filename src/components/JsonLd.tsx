import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["NGO", "NonProfitOrganization"],
        "@id": "https://bbmfoundation.online/#organization",
        "name": "BBM Foundation",
        "alternateName": "BBM India Foundation",
        "url": "https://bbmfoundation.online",
        "logo": "https://bbmfoundation.online/logo.png",
        "description":
          "BBM FOUNDATION is a social-impact and charitable foundation committed to creating meaningful change through service, opportunity creation, community development, women empowerment, and humanitarian initiatives.",
        "slogan": "Building Lives • Creating Opportunities • Serving Humanity",
        "email": "bbmindiafoundation@gmail.com",
        "telephone": "+918500863000",
        "founder": {
          "@type": "Person",
          "name": "Dr. B. Giribabu",
          "jobTitle": "President & Managing Trustee"
        },
        "knowsAbout": [
          "Child & Family Welfare",
          "Education Support",
          "Skill Development",
          "Women Empowerment",
          "Youth Citizenship",
          "Health and Wellbeing Campaigns",
          "Community Development",
          "Humanitarian Relief"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+918500863000",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "te", "hi"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+919885126368",
            "contactType": "support",
            "areaServed": "IN"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Door No. 3-150, Main Street, Bypureddy Palem",
          "addressLocality": "Narsipatnam, Anakapalli Dist.",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "531116",
          "addressCountry": "IN"
        },
        "potentialAction": {
          "@type": "DonateAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://bbmfoundation.online/donate",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          }
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

