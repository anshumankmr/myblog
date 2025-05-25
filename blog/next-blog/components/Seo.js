import Head from 'next/head';

const Seo = ({ title, description, children }) => {
  const siteTitle = "Anshuman's Blog"; // Default from gatsby-config
  const siteDescription = "A starter blog demonstrating what Gatsby can do."; // Default
  const siteTwitter = "@anshuman_kmr"; // Default
  const themeColor = "#005b99"; // Match manifest.json

  const metaDescription = description || siteDescription;
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteTwitter} />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      
      {/* Added for Web Manifest */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content={themeColor} />
      <link rel="apple-touch-icon" href="/images/gatsby-icon.png" />
      
      {children}
    </Head>
  );
};

export default Seo;
