export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sendir",
    "description": "Plataforma de gestión de tareas universitarias con sincronización automática",
    "url": "https://sendir.app",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "4.49",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "4.49",
        "priceCurrency": "USD",
        "billingIncrement": "P1M"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Sendir",
      "url": "https://sendir.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sendir",
      "url": "https://sendir.app"
    },
    "featureList": [
      "Gestión de tareas universitarias",
      "Sincronización automática con universidades",
      "Notificaciones inteligentes",
      "Organización por materias",
      "Calendario académico",
      "Acceso multiplataforma"
    ],
    "screenshot": "https://sendir.app/sendir-icon.png",
    "softwareVersion": "1.0.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 